import { NgModule } from '@angular/core';
import { UserFacade } from "@state/user/user.facade";
import { NgxsModule } from "@ngxs/store";
import { UserState } from "@state/user/user.state";
import { environment } from "@src/environments/environment";


@NgModule({
  providers: [UserFacade],
  imports: [
    NgxsModule.forRoot([UserState], {developmentMode: !environment.production}),
  ],
})
export class StateModule {
}
