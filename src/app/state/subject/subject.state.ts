import { NoteSubject, NoteSubjectDto } from "@models/subject.interface";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ApiService } from "@services/api.service";
import { switchMap, tap } from "rxjs/operators";
import { SubjectActions } from "@state/subject/subject.actions";
import { Injectable } from "@angular/core";
import { NoteFacade } from "@state/note/note.facade";


export interface SubjectStateModel {
  subjects: NoteSubject[];
  checkedSubject: NoteSubject | null;
}

const defaults: SubjectStateModel = {
  subjects: [],
  checkedSubject: null,
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
    private noteFacade: NoteFacade,
  ) {
  }

  @Action(SubjectActions.GetAll)
  getAll({getState, setState}: StateContext<SubjectStateModel>) {
    return this.api.getSubjects().pipe(
      tap((dto) => {
        const subjects: NoteSubject[] = this.parseSubjects(dto);
        setState({...getState(), subjects});
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

  @Action(SubjectActions.Delete)
  delete({getState, setState}: StateContext<SubjectStateModel>, {id}: SubjectActions.Delete) {
    return this.api.deleteSubject(id).pipe(
      tap(() => {
        const state = getState();
        const subjects = state.subjects.filter(s => s.id !== id);
        setState({...state, subjects});
      }),
    );
  }

  @Action(SubjectActions.Check)
  check({getState, setState}: StateContext<SubjectStateModel>, {id}: SubjectActions.Check) {
    const checkedSubject = getState().subjects.find(s => s.id === id) || null;
    this.noteFacade.checkBySubject(checkedSubject);
    setState({...getState(), checkedSubject});
  }
}
