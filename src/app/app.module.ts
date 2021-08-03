import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageModule } from "@pages/login-page/login-page.module";
import { StateModule } from "@state/state.module";
import { HttpClientModule } from "@angular/common/http";
import { TemplateModule } from "@core/template/template.module";
import { UserFacade } from "@state/user/user.facade";
import { USER_STORAGE, UserStorage } from "@shared/storages/user.storage";
import { UserDto } from "@models/user.interface";

function initializeApp(storage: UserStorage, facade: UserFacade): () => Promise<any> {
  return () => new Promise((resolve) => {
    const dto = <UserDto>storage.state;

    if (dto?.accessToken) {
      facade.update(dto);
    }

    resolve(null);
  });
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // Core
    TemplateModule,
    // Pages
    LoginPageModule,
    // State
    StateModule,
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    deps: [USER_STORAGE, UserFacade],
    multi: true,
  }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
