import { Component, OnInit } from '@angular/core';
import { Note } from "@models/note.interface";
import { NoteFacade } from "@state/note/note.facade";
import { Router } from "@angular/router";

@Component({
  selector: 'app-notebar',
  templateUrl: './notebar.component.html',
  styleUrls: ['./notebar.component.scss'],
})
export class NotebarComponent implements OnInit {

  constructor(
    public noteFacade: NoteFacade,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
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
}
