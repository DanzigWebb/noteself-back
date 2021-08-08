import { NoteSubject, NoteSubjectDto } from "@models/subject.interface";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ApiService } from "@services/api.service";
import { switchMap, tap } from "rxjs/operators";
import { SubjectActions } from "@state/subject/subject.actions";
import { Injectable } from "@angular/core";


export interface SubjectStateModel {
  subjects: NoteSubject[];
}

const defaults: SubjectStateModel = {
  subjects: [],
};

@State<SubjectStateModel>({
  name: 'subject',
  defaults,
})
@Injectable()
export class SubjectState {
  @Selector()
  static state(s: SubjectStateModel): SubjectStateModel {
    return s;
  }

  @Selector()
  static notes(s: SubjectStateModel): NoteSubject[] {
    return s.subjects;
  }

  constructor(
    private api: ApiService,
  ) {
  }

  @Action(SubjectActions.GetAll)
  getAll({setState}: StateContext<SubjectStateModel>) {
    return this.api.getSubjects().pipe(
      tap((dto) => {
        const subjects: NoteSubject[] = this.parseSubjects(dto);
        setState({subjects});
      }),
    );
  }

  @Action(SubjectActions.Create)
  create({dispatch}: StateContext<SubjectStateModel>, {payload}: SubjectActions.Create) {
    return this.api.createSubject(payload).pipe(
      switchMap(() => dispatch(new SubjectActions.GetAll())),
    );
  }

  parseSubjects(dto: NoteSubjectDto[]): NoteSubject[] {
    return dto.map(d => new NoteSubject(d))
      .sort((a, b) => (+b.createdAt) - (+a.createdAt));
  }
}
