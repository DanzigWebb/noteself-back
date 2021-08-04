import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SubjectStateModel } from "@state/subject/subject.state";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {

  @Input() subjectState: SubjectStateModel | null = null;

  constructor() {
  }

  ngOnInit(): void {
  }

}
