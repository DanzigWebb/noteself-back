export interface NoteDto {
  id: number;
  title: string;
  description: string;
  subject: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export class Note implements NoteDto {
  id: number;
  title: string;
  description: string;
  subject: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(n: NoteDto) {
    this.id = n.id;
    this.title = n.title;
    this.description = n.description;
    this.subject = n.subject;

    this.createdAt = new Date(n.createdAt);
    this.updatedAt = new Date(n.updatedAt);
  }
}

export interface NoteUpdateDto {
  title: string;
  description: string;
  subject: string;
}
