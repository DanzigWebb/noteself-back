import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NoteFacade } from "@state/note/note.facade";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartPageComponent implements OnInit {

  notes$ = this.note.notes$;

  constructor(
    private note: NoteFacade,
  ) {
  }

  ngOnInit(): void {
    this.note.getAll();
  }

}
