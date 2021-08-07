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

  @Output() checkNote = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onCheckNote(n: Note): void {
    this.checkNote.emit(n.id);
  }

}
