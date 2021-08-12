import { NoteSubject } from "@models/subject.interface";
import { Note, NoteCreateDto, NoteUpdateDto } from "@models/note.interface";

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
        subject: null
      }
    ) {
    }
  }

  export class Delete {
    static readonly type = '[Note] Delete';
    constructor(public id: number) {
    }
  }

  export class CheckBySubject {
    static readonly type = '[Note] Check by Subject';
    constructor(public payload: NoteSubject | null) {
    }
  }

  export class Save {
    static readonly type = '[Note] Save One';
    constructor(public dto: NoteUpdateDto, public id: number) {
    }
  }

  export class SaveAll {
    static readonly type = '[Note] Save All';
  }

  export class Update {
    static readonly type = '[Note] Update One';
    constructor(public note: Note) {
    }
  }

  export class CheckForEdit {
    static readonly type = '[Note] Check for Edit';
    constructor(public id: number) {
    }
  }
}
