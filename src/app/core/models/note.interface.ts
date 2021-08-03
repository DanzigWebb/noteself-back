export interface NoteDto {
  id: number;
  title: string;
  description: string;
  subject: string;
}

export class Note implements NoteDto {
  id: number;
  title: string;
  description: string;
  subject: string;

  constructor(n: NoteDto) {
    this.id = n.id;
    this.title = n.title;
    this.description = n.description;
    this.subject = n.subject;
  }
}
