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

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.userState) {
      this.user = this.userState?.user;
    }
  }

  onLogout(): void {
    this.logout.emit();
  }

}
