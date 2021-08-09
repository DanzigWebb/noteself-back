import { NoteSubject } from "@models/subject.interface";
import { NoteCreateDto, NoteUpdateDto } from "@models/note.interface";

export namespace NoteActions {
  export class GetAll {
    static readonly type = '[Note] Get All';
  }

  export class Create {
    static readonly type = '[Note] Create';
    constructor(
      public dto: NoteCreateDto = {
        title: '',
        description: '',
        subject: ''
      }
    ) {
    }
  }

  export class CheckBySubject {
    static readonly type = '[Note] Check by Subject';
    constructor(public payload: NoteSubject | null) {
    }
  }

  export class Update {
    static readonly type = '[Note] Update one';
    constructor(public dto: NoteUpdateDto, public id: number) {
    }
  }

  export class CheckForEdit {
    static readonly type = '[Note] Check for Edit';
    constructor(public id: number) {
    }
  }
}
