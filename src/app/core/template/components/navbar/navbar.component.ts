import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UiFacade } from "@state/ui/ui.facade";
import { map, take } from "rxjs/operators";
import { NoteSubject, NoteSubjectCreateDto } from "@models/subject.interface";
import { SubjectFacade } from "@state/subject/subject.facade";

enum DragLimits {
  min = 80,
  max = 500,
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {

  dragLimits = {
    min: DragLimits.min,
    max: DragLimits.max,
  };

  isOpen$ = this.ui.sidebar$.pipe(
    map((s) => s.isOpen),
  );

  width = 200;

  constructor(
    public subjectFacade: SubjectFacade,
    private ui: UiFacade,
  ) {
  }

  ngOnInit(): void {
    this.ui.state$
      .pipe(take(1))
      .subscribe(s => {
        this.width = s.navbar.width;
      });
  }

  onDrag(e: number) {
    this.ui.navbar.setWidth(e);
    if (e === DragLimits.min) {
      this.ui.navbar.hide();
    }
  }

  check(item: NoteSubject | null) {
    this.subjectFacade.check(item?.id || -1);
  }

  create(dto: NoteSubjectCreateDto): void {
    this.subjectFacade.create(dto);
  }

  delete(subject: NoteSubject) {
    this.subjectFacade.delete(subject.id);
  }
}
