import { Note } from "@models/note.interface";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { NoteActions } from "@state/note/note.actions";
import { ApiService } from "@services/api.service";
import { switchMap, tap } from "rxjs/operators";
import { NoteSubject } from "@models/subject.interface";
import { Router } from "@angular/router";

export interface NoteStateModel {
  notes: Note[];
  editNote: Note | null;
  checkedNotes: Note[];
  checkedSubject: NoteSubject | null;
}

const defaults: NoteStateModel = {
  notes: [],
  editNote: null,
  checkedNotes: [],
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
  static notes(s: NoteStateModel): Note[] {
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
        const notes: Note[] = dto.map(d => new Note(d));
        setState({...getState(), notes});
      }),
    );
  }

  @Action(NoteActions.Create)
  create({getState, setState, dispatch}: StateContext<NoteStateModel>, {dto}: NoteActions.Create) {
    return this.api.createNote(dto).pipe(
      switchMap((dto) => dispatch(new NoteActions.GetAll()).pipe(
        tap(() => this.router.navigate(['edit', dto.id])),
      )),
    );
  }

  @Action(NoteActions.CheckBySubject)
  checkBySubject({getState, setState}: StateContext<NoteStateModel>, {payload}: NoteActions.CheckBySubject) {
    const notes = getState().notes;
    let checkedNotes = this.filterNotes(payload, notes);
    setState({
      ...getState(),
      checkedNotes,
      checkedSubject: payload,
    });
  }

  filterNotes(subject: NoteSubject | null, notes: Note[]): Note[] {
    if (!subject) {
      return notes;
    } else {
      return notes.filter((n) => n.subject === subject.title);
    }
  }

  @Action(NoteActions.CheckForEdit)
  checkForEdit({getState, setState}: StateContext<NoteStateModel>, {id}: NoteActions.CheckForEdit) {
    const state = getState();
    const editNote = state.notes.find(n => n.id === id) || null;
    setState({...state, editNote});
  }

  @Action(NoteActions.Update)
  update({getState, setState}: StateContext<NoteStateModel>, {dto, id}: NoteActions.Update) {
    return this.api.updateNote(dto, id).pipe(
      tap((dto) => {
        const state = getState();
        const note = new Note(dto);
        const notes = [...state.notes];
        const checkedNotes = [...state.checkedNotes];

        const i = notes.findIndex(n => n.id === note.id);
        if (i >= 0) {
          notes[i] = {...note};
        }

        const j = notes.findIndex(n => n.id === note.id);
        if (j >= 0) {
          checkedNotes[j] = {...note};
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
