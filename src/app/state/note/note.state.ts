import { Note } from "@models/note.interface";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { NoteActions } from "@state/note/note.actions";
import { ApiService } from "@services/api.service";
import { tap } from "rxjs/operators";

export interface NoteStateModel {
  notes: Note[];
}

const defaults: NoteStateModel = {
  notes: [],
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
  getAll({setState}: StateContext<NoteStateModel>) {
    return this.api.getNotes().pipe(
      tap((dto) => {
        const notes: Note[] = dto.map(d => new Note(d));
        setState({notes});
      }),
    );
  }
}
