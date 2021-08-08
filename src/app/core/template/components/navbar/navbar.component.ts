import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SubjectStateModel } from "@state/subject/subject.state";
import { UiFacade } from "@state/ui/ui.facade";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {

  @Input() subjectState: SubjectStateModel | null = null;

  isOpen$ = this.ui.sidebar$.pipe(
    map((s) => s.isOpen),
  );

  constructor(
    private ui: UiFacade,
  ) {
  }

  ngOnInit(): void {
  }
}
