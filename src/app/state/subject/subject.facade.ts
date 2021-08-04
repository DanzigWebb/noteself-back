import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { NoteState } from "@state/note/note.state";
import { Observable } from "rxjs";
import { SubjectStateModel } from "@state/subject/subject.state";
import { NoteSubject } from "@models/subject.interface";
import { switchMap } from "rxjs/operators";
import { SubjectActions } from "@state/subject/subject.actions";

@Injectable()
export class SubjectFacade {
  @Select(NoteState.state) state$!: Observable<SubjectStateModel>;
  @Select(NoteState.notes) notes$!: Observable<NoteSubject[]>;

  constructor(
    private store: Store,
  ) {
  }

  getAll(): Observable<SubjectStateModel> {
    return this.store.dispatch(new SubjectActions.GetAll()).pipe(
      switchMap(() => this.state$),
    );
  }
}
