import { NoteSubjectCreateDto } from "@models/subject.interface";

export namespace SubjectActions {
  export class GetAll {
    static readonly type = '[Subject] Get All';
  }

  export class Create {
    static readonly type = '[Subject] Create';
    constructor(public payload: NoteSubjectCreateDto) {
    }
  }

  export class Delete {
    static readonly type = '[Subject] Delete';
    constructor(public id: number) {
    }
  }

  export class Check {
    static readonly type = '[Subject] Check';
    constructor(public id: number) {
    }
  }
}
