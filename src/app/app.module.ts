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
import { StartPageModule } from "@pages/start-page/start-page.module";
import { NoteFacade } from "@state/note/note.facade";
import { SubjectFacade } from "@state/subject/subject.facade";
import { forkJoin } from "rxjs";
import { take } from "rxjs/operators";
import { UiStateModel } from "@state/ui/ui.state";
import { UI_STORAGE, UiStorage } from "@shared/storages/ui.storage";
import { UiFacade } from "@state/ui/ui.facade";

// Todo: вынести в InitModule
function initializeApp(storage: UserStorage, uiStorage: UiStorage, uiFacade: UiFacade, user: UserFacade, note: NoteFacade, subject: SubjectFacade): () => Promise<any> {
  return () => new Promise((resolve) => {
    const dto = <UserDto>storage.state;
    const ui = <UiStateModel>uiStorage.state;


    if (ui) {
      const {navbar, notebar} = ui;
      if (navbar) {
        uiFacade.navbar.setWidth(navbar?.width);
        navbar?.isOpen
          ? uiFacade.navbar.show()
          : uiFacade.navbar.hide();
      }
      if (notebar) {
        uiFacade.notebar.setWidth(notebar?.width);
      }
    }

    if (dto?.accessToken) {
      user.update(dto);
      forkJoin([
        note.getAll().pipe(take(1)),
        subject.getAll().pipe(take(1)),
      ]).subscribe(() => {
        note.checkDefaultSubject();
        resolve(null);
      });
    } else {
      resolve(null);
    }
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
    StartPageModule,
    // State
    StateModule,
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    deps: [USER_STORAGE, UI_STORAGE, UiFacade, UserFacade, NoteFacade, SubjectFacade],
    multi: true,
  }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
