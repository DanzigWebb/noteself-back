import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NoteStateModel } from "@state/note/note.state";

@Component({
  selector: 'app-notebar',
  templateUrl: './notebar.component.html',
  styleUrls: ['./notebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotebarComponent implements OnInit {

  @Input() noteState: NoteStateModel | null = null;

  constructor() {
  }

  ngOnInit(): void {
  }

}
