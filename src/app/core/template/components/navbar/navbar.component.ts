import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubjectStateModel } from "@state/subject/subject.state";
import { UiFacade } from "@state/ui/ui.facade";
import { map } from "rxjs/operators";
import { NoteSubjectCreateDto } from "@models/subject.interface";

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

  @Input() subjectState: SubjectStateModel | null = null;

  @Output() onCreateSubject = new EventEmitter<NoteSubjectCreateDto>();

  dragLimits = {
    min: DragLimits.min,
    max: DragLimits.max,
  };

  isOpen$ = this.ui.sidebar$.pipe(
    map((s) => s.isOpen),
  );

  constructor(
    private ui: UiFacade,
  ) {
  }

  ngOnInit(): void {
  }

  onDrag(e: number) {
    if (e === DragLimits.min) {
      this.ui.navbar.hide();
    }
  }

  createSubject(dto: NoteSubjectCreateDto): void {
    this.onCreateSubject.emit(dto);
  }
}
