import { Component, OnInit } from '@angular/core';
import { UserFacade } from "@state/user/user.facade";
import { Router } from "@angular/router";
import { Routers } from "@core/enums/routers.enum";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  public userState$ = this.userFacade.state$;

  constructor(
    private userFacade: UserFacade,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.userFacade.logout().subscribe(() => {
      this.router.navigate([Routers.login]);
    });
  }
}
