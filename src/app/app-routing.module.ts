import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "@core/template/main/main.component";
import { LoginPageComponent } from "@pages/login-page/login-page.component";
import { Routers } from "@core/enums/routers.enum";
import { GuestGuard, UserGuard } from "@core/guards/login.guard";
import { NotFoundPageComponent } from "@pages/not-found-page/not-found-page.component";
import { StartPageComponent } from "@pages/start-page/start-page.component";

const routes: Routes = [
  {
    path: Routers.home,
    component: MainComponent,
    canActivate: [UserGuard],
    children: [
      {path: '', component: StartPageComponent},
    ],
  },
  {
    path: Routers.login,
    component: LoginPageComponent,
    canActivate: [GuestGuard],
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
