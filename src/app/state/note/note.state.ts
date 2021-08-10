import { Note } from "@models/note.interface";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { NoteActions } from "@state/note/note.actions";
import { ApiService } from "@services/api.service";
import { switchMap, tap } from "rxjs/operators";
import { NoteSubject } from "@models/subject.interface";
import { Router } from "@angular/router";

export interface NoteStateModel {
  notes: NoteMap;
  checkedNotes: NoteMap;
  editNote: Note | null;
  checkedSubject: NoteSubject | null;
}

export type NoteMap = Map<number, Note>;


const defaults: NoteStateModel = {
  notes: new Map<number, Note>(),
  checkedNotes: new Map<number, Note>(),
  editNote: null,
  checkedSubject: null,
};

@State<NoteStateModel>({
  name: 'note',
  defaults,
})
@Injectable()
export class NoteState {

  @Selector()
  static state(s: NoteStateModel): NoteStateModel {
    return s;
  }

  @Selector()
  static notes(s: NoteStateModel): NoteMap {
    return s.notes;
  }

  @Selector()
  static editNote(s: NoteStateModel): Note | null {
    return s.editNote;
  }

  constructor(
    private api: ApiService,
    private router: Router,
  ) {
  }

  @Action(NoteActions.GetAll)
  getAll({getState, setState}: StateContext<NoteStateModel>) {
    return this.api.getNotes().pipe(
      tap((dto) => {
        const noteModels: Note[] = dto.map(d => new Note(d));
        const notes = new Map();
        noteModels.forEach((n) => notes.set(n.id, n));

        setState({...getState(), notes});
      }),
    );
  }

  @Action(NoteActions.Create)
  create({getState, setState, dispatch}: StateContext<NoteStateModel>, {dto}: NoteActions.Create) {
    return this.api.createNote(dto).pipe(
      switchMap((dto) => dispatch(new NoteActions.GetAll()).pipe(
        tap(() => {
          const subject = getState().checkedSubject;
          dispatch(new NoteActions.CheckBySubject(subject));
          this.router.navigate(['edit', dto.id]);
        }),
      )),
    );
  }

  @Action(NoteActions.Delete)
  delete({getState, setState, dispatch}: StateContext<NoteStateModel>, {id}: NoteActions.Delete) {
    return this.api.deleteNote(id).pipe(
      tap(() => {
        const state = getState();
        state.notes.delete(id);
        state.checkedNotes.delete(id);

        setState({...state});

        // Убираем заметку из редактирования, если она была удалена
        const isChecked = state.editNote?.id === id;
        if (isChecked) {
          dispatch(new NoteActions.CheckForEdit(id));
        }
      }),
    );
  }

  @Action(NoteActions.CheckBySubject)
  checkBySubject({getState, setState}: StateContext<NoteStateModel>, {payload}: NoteActions.CheckBySubject) {
    const notes = getState().notes;
    const checkedNotes = this.filterNotes(payload, notes);

    setState({
      ...getState(),
      checkedNotes,
      checkedSubject: payload,
    });
  }

  filterNotes(subject: NoteSubject | null, notes: NoteMap): NoteMap {
    const map: NoteMap = new Map<number, Note>();
    if (!subject) {
      return notes;
    } else {
      Array.from(notes.values())
        .filter((n) => n.subject === subject.title)
        .forEach(n => map.set(n.id, n));

      return map;
    }
  }

  @Action(NoteActions.CheckForEdit)
  checkForEdit({getState, setState}: StateContext<NoteStateModel>, {id}: NoteActions.CheckForEdit) {
    const state = getState();
    const editNote = state.notes.get(id) || null;

    setState({...state, editNote});
  }

  @Action(NoteActions.Update)
  update({getState, setState}: StateContext<NoteStateModel>, {note}: NoteActions.Update) {
    const state = getState();
    const notes = state.notes;
    notes.set(note.id, note);
    setState({...state, notes});
  }

  @Action(NoteActions.Save)
  save({getState, setState}: StateContext<NoteStateModel>, {dto, id}: NoteActions.Save) {
    return this.api.updateNote(dto, id).pipe(
      tap((dto) => {
        const state = getState();
        const note = new Note(dto);
        const {notes, checkedNotes} = state;

        if (notes.has(id)) {
          notes.set(note.id, note);
        }

        if (checkedNotes.has(id)) {
          checkedNotes.set(note.id, note);
        }

        setState({
          ...state,
          notes,
          checkedNotes,
        });
      }),
    );
  }
}
