import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UserStateModel } from "@state/user/user.state";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

  @Input() userState: UserStateModel | null = null;

  constructor() {
  }

  ngOnInit(): void {
  }

}
