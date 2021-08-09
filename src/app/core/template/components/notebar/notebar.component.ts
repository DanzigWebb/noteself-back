import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NoteStateModel } from "@state/note/note.state";
import { Note } from "@models/note.interface";

@Component({
  selector: 'app-notebar',
  templateUrl: './notebar.component.html',
  styleUrls: ['./notebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotebarComponent implements OnInit {

  @Input() noteState: NoteStateModel | null = null;

  @Output() onCheckNote = new EventEmitter<number>();
  @Output() onCreateNote = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  checkNote(n: Note): void {
    this.onCheckNote.emit(n.id);
  }

  create() {
    this.onCreateNote.emit();
  }
}
