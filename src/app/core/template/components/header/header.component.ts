import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UserStateModel } from "@state/user/user.state";
import { UserDto } from "@models/user.interface";
import { UiFacade } from "@state/ui/ui.facade";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnChanges {

  @Input() userState: UserStateModel | null = null;
  @Output() logout = new EventEmitter();

  public user: UserDto | undefined;
  public isOpenSidebar$ = this.ui.sidebar$.pipe(
    map((s) => s.isOpen),
  );

  constructor(
    private ui: UiFacade,
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.userState) {
      this.user = this.userState?.user;
    }
  }

  toggleSidebar() {
    this.ui.sidebar.toggle();
  }

  onLogout(): void {
    this.logout.emit();
  }

}
