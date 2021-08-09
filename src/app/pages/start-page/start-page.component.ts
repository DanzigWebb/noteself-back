import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NoteFacade } from "@state/note/note.facade";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { Observable, Subject } from "rxjs";
import { Note } from "@models/note.interface";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartPageComponent implements OnInit, OnDestroy {

  public editNote$: Observable<Note | null> = this.note.editNote$;

  private unsubscribe = new Subject();

  constructor(
    private note: NoteFacade,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.checkEditNote();
  }

  checkEditNote(): void {
    this.route.paramMap.pipe(
      map((map) => map.get('id')),
    ).subscribe((id) => {
      if (id) {
        this.note.edit(+id);
      } else {
        this.note.edit(-1);
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
