import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserFacade } from "@state/user/user.facade";
import { SubjectFacade } from "@state/subject/subject.facade";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {

  userState$ = this.userFacade.state$;
  subjectState$ = this.subjectFacade.state$;

  constructor(
    private userFacade: UserFacade,
    private subjectFacade: SubjectFacade,
  ) {
  }

  ngOnInit(): void {
    this.subjectFacade.getAll();
  }

}
