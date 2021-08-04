import { NoteSubject } from "@models/subject.interface";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ApiService } from "@services/api.service";
import { tap } from "rxjs/operators";
import { SubjectActions } from "@state/subject/subject.actions";


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
        const subjects: NoteSubject[] = dto.map(d => new NoteSubject(d));
        setState({subjects});
      }),
    );
  }
}
