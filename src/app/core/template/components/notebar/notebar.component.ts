import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Note } from "@models/note.interface";
import { NoteFacade } from "@state/note/note.facade";

@Component({
  selector: 'app-notebar',
  templateUrl: './notebar.component.html',
  styleUrls: ['./notebar.component.scss'],
})
export class NotebarComponent implements OnInit {

  @Output() onCheck = new EventEmitter<number>();
  @Output() onCreate = new EventEmitter();
  @Output() onDelete = new EventEmitter<number>();

  constructor(
    public noteFacade: NoteFacade
  ) {
  }

  ngOnInit(): void {
  }

  check(n: Note): void {
    this.onCheck.emit(n.id);
  }

  create() {
    this.onCreate.emit();
  }

  delete(note: Note) {
    this.onDelete.emit(note.id);
  }
}
