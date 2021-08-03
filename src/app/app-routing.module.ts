import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "@core/template/main/main.component";
import { LoginPageComponent } from "@pages/login-page/login-page.component";
import { Routers } from "@core/enums/routers.enum";
import { LoginGuard } from "@core/guards/login.guard";
import { GuestGuard } from "@core/guards/guest.guard";

const routes: Routes = [
  {
    path: Routers.home,
    component: MainComponent,
    canActivate: [LoginGuard],
  },
  {
    path: Routers.login,
    component: LoginPageComponent,
    canActivate: [GuestGuard],
  },
  // Todo: реализовать страницу 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
