import { Component, OnInit } from '@angular/core';
import { Note } from "@models/note.interface";
import { NoteFacade } from "@state/note/note.facade";
import { Router } from "@angular/router";
import { UiFacade } from "@state/ui/ui.facade";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-notebar',
  templateUrl: './notebar.component.html',
  styleUrls: ['./notebar.component.scss'],
})
export class NotebarComponent implements OnInit {

  width = 200;

  unsubscribe$ = new Subject();

  constructor(
    public noteFacade: NoteFacade,
    public ui: UiFacade,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.ui.state$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(s => {
        this.width = s.notebar.width;
      });
  }

  check(n: Note): void {
    this.router.navigate(['edit', n.id]);
  }

  create() {
    this.noteFacade.create();
  }

  delete(n: Note) {
    this.noteFacade.delete(n.id);
  }

  setWidth(e: number) {
    this.ui.notebar.setWidth(e);
  }
}
