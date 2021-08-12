import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { UiFacade } from "@state/ui/ui.facade";
import { map, takeUntil } from "rxjs/operators";
import { NoteSubject, NoteSubjectCreateDto } from "@models/subject.interface";
import { SubjectFacade } from "@state/subject/subject.facade";
import { Subject } from "rxjs";

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
export class NavbarComponent implements OnInit, OnDestroy {

  dragLimits = {
    min: DragLimits.min,
    max: DragLimits.max,
  };

  isOpen$ = this.ui.sidebar$.pipe(
    map((s) => s.isOpen),
  );

  width = 200;

  unsubscribe$ = new Subject();

  constructor(
    public subjectFacade: SubjectFacade,
    private ui: UiFacade,
  ) {
  }

  ngOnInit(): void {
    this.ui.state$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(s => {
        this.width = s.navbar.width;
      });
  }

  setWidth(e: number) {
    this.ui.navbar.setWidth(e);
    if (e === DragLimits.min) {
      this.ui.navbar.hide();
      this.ui.navbar.setWidth(e + 20);
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
