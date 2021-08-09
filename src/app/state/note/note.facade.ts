import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { NoteState, NoteStateModel } from "@state/note/note.state";
import { Observable } from "rxjs";
import { Note, NoteUpdateDto } from "@models/note.interface";
import { NoteActions } from "@state/note/note.actions";
import { switchMap } from "rxjs/operators";
import { NoteSubject } from "@models/subject.interface";

@Injectable()
export class NoteFacade {
  @Select(NoteState.state) state$!: Observable<NoteStateModel>;
  @Select(NoteState.notes) notes$!: Observable<Note[]>;

  constructor(
    private store: Store,
  ) {
  }

  getAll(): Observable<NoteStateModel> {
    return this.store.dispatch(new NoteActions.GetAll()).pipe(
      switchMap(() => this.state$),
    );
  }

  checkBySubject(subject: NoteSubject | null): Observable<NoteStateModel> {
    return this.store.dispatch(new NoteActions.CheckBySubject(subject)).pipe(
      switchMap(() => this.state$),
    );
  }

  update(dto: NoteUpdateDto, id: number): Observable<NoteStateModel> {
    return this.store.dispatch(new NoteActions.Update(dto, id)).pipe(
      switchMap(() => this.state$),
    );
  }
}
