import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NoteFacade } from "@state/note/note.facade";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs/operators";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartPageComponent implements OnInit {

  public editNote$ = this.route.paramMap.pipe(
    map((map) => map.get('id')),
    map((id) => id ? +id : -1),
    switchMap((id) => this.note.notes$.pipe(
      map((notes) => notes.find(n => n.id === id) || null),
    )),
  );

  constructor(
    private note: NoteFacade,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
  }
}
