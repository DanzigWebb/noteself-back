export interface NoteSubjectDto {
  id: number;
  title: string;
  description: string;
}

export class NoteSubject implements NoteSubjectDto {
  id: number;
  title: string;
  description: string;

  constructor(s: NoteSubjectDto) {
    this.id = s.id;
    this.title = s.title;
    this.description = s.description;
  }
}
