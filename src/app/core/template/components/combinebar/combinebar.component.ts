import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NoteFacade } from "@state/note/note.facade";
import { SubjectFacade } from "@state/subject/subject.facade";
import { merge } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { NoteSubject } from "@models/subject.interface";
import { Note } from "@models/note.interface";
import { NoteMap } from "@state/note/note.state";
import { Router } from "@angular/router";
import { UiFacade } from "@state/ui/ui.facade";

@Component({
  selector: 'app-combinebar',
  templateUrl: './combinebar.component.html',
  styleUrls: ['./combinebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CombinebarComponent implements OnInit {

  data: Map<NoteSubject, Note[]> = new Map<NoteSubject, Note[]>();

  constructor(
    public notes: NoteFacade,
    private subjects: SubjectFacade,
    private router: Router,
    private ui: UiFacade
  ) {
  }

  ngOnInit(): void {
    merge(
      this.notes.notes$.pipe(
        switchMap(notes => this.subjects.subjects$.pipe(
          tap(subjects => this.updateData(subjects, notes)),
        )),
      ),
      this.subjects.subjects$.pipe(
        switchMap(subjects => this.notes.notes$.pipe(
          tap(notes => this.updateData(subjects, notes)),
        )),
      ),
    ).subscribe();
  }

  updateData(subjects: NoteSubject[], notes: NoteMap) {
    subjects.forEach(s => {
      const currentNotes = [...notes.values()].filter(n => n.subject === s.id);
      this.data.set(s, currentNotes);
    });
  }

  check(n: Note) {
    this.router.navigate(['edit', n.id]).then(() => {
      this.ui.combinebar.hide();
    });
  }

  delete(n: Note) {
    this.notes.delete(n.id);
  }

  create() {
    this.notes.create();
  }
}
