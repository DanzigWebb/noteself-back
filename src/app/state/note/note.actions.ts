import { NoteSubject } from "@models/subject.interface";

export namespace NoteActions {
  export class GetAll {
    static readonly type = '[Note] Get All';
  }

  export class CheckBySubject {
    static readonly type = '[Note] Check by Subject';
    constructor(public payload: NoteSubject | null) {
    }
  }
}
