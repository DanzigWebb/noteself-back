import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Note } from "@models/note.interface";

@Component({
  selector: 'app-editor-area',
  templateUrl: './editor-area.component.html',
  styleUrls: ['./editor-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorAreaComponent implements OnInit {

  @Input() note: Note | null = null;

  constructor() {
  }

  ngOnInit(): void {
  }

}
