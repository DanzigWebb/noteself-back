import { Component, OnInit } from '@angular/core';
import { UserFacade } from "@state/user/user.facade";
import { Router } from "@angular/router";
import { Routers } from "@core/enums/routers.enum";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map } from "rxjs/operators";
import { UiFacade } from "@state/ui/ui.facade";
import { SlideAnimation } from "@shared/animations/slide";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [SlideAnimation]
})
export class MainComponent implements OnInit {

  public userState$ = this.userFacade.state$;
  public isMobile$ = this.breakpointObserver.observe(Breakpoints.XSmall).pipe(
    map(state => state.matches)
  )

  constructor(
    private userFacade: UserFacade,
    private router: Router,
    public breakpointObserver: BreakpointObserver,
    public ui: UiFacade
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
