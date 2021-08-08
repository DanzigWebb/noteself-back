import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { SubjectState, SubjectStateModel } from "@state/subject/subject.state";
import { NoteSubject, NoteSubjectCreateDto } from "@models/subject.interface";
import { switchMap } from "rxjs/operators";
import { SubjectActions } from "@state/subject/subject.actions";

@Injectable()
export class SubjectFacade {
  @Select(SubjectState.state) state$!: Observable<SubjectStateModel>;
  @Select(SubjectState.notes) notes$!: Observable<NoteSubject[]>;

  constructor(
    private store: Store,
  ) {
  }

  getAll(): Observable<SubjectStateModel> {
    return this.store.dispatch(new SubjectActions.GetAll()).pipe(
      switchMap(() => this.state$),
    );
  }

  create(dto: NoteSubjectCreateDto): Observable<SubjectStateModel> {
    return this.store.dispatch(new SubjectActions.Create(dto)).pipe(
      switchMap(() => this.state$),
    );
  }
}
