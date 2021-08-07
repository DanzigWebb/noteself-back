export interface NoteSubjectDto {
  id: number;
  title: string;
  description: string;

  createdAt: string | Date;
  updatedAt: string | Date;
}

export class NoteSubject implements NoteSubjectDto {
  id: number;
  title: string;
  description: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(s: NoteSubjectDto) {
    this.id = s.id;
    this.title = s.title;
    this.description = s.description;

    this.createdAt = new Date(s.createdAt);
    this.updatedAt = new Date(s.updatedAt);
  }
}
