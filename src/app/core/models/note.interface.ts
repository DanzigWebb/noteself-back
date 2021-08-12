export interface NoteDto {
  id: number;
  title: string;
  description: string;
  subject: number | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export class Note implements NoteDto {
  id: number;
  title: string;
  description: string;
  subject: number | null = null;

  createdAt: Date;
  updatedAt: Date;

  isUpdated = false;

  constructor(n: NoteDto) {
    this.id = n.id;
    this.title = n.title;
    this.description = n.description;
    this.subject = n.subject || null;

    this.createdAt = new Date(n.createdAt);
    this.updatedAt = new Date(n.updatedAt);
  }
}

export interface NoteCreateDto {
  title: string;
  description: string;
  subject: string;
}

export interface NoteUpdateDto {
  title: string;
  description: string;
  subject: number | null;
}
