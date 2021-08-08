import { Note } from "@models/note.interface";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { NoteActions } from "@state/note/note.actions";
import { ApiService } from "@services/api.service";
import { tap } from "rxjs/operators";
import { NoteSubject } from "@models/subject.interface";

export interface NoteStateModel {
  notes: Note[];
  checkedNotes: Note[];
  checkedSubject: NoteSubject | null;
}

const defaults: NoteStateModel = {
  notes: [],
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

  constructor(
    private api: ApiService,
  ) {
  }

  @Action(NoteActions.GetAll)
  getAll({getState, setState, dispatch}: StateContext<NoteStateModel>) {
    return this.api.getNotes().pipe(
      tap((dto) => {
        const notes: Note[] = dto.map(d => new Note(d));
        setState({...getState(), notes});
        dispatch(new NoteActions.CheckBySubject(null));
      }),
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
}
