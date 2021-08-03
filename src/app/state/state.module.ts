import { NgModule } from '@angular/core';
import { UserFacade } from "@state/user/user.facade";
import { NgxsModule } from "@ngxs/store";
import { UserState } from "@state/user/user.state";
import { environment } from "@src/environments/environment";
import { NoteFacade } from "@state/note/note.facade";
import { NoteState } from "@state/note/note.state";


@NgModule({
  providers: [UserFacade, NoteFacade],
  imports: [
    NgxsModule.forRoot(
      [
        UserState,
        NoteState,
      ],
      {
        developmentMode: !environment.production,
      },
    ),
  ],
})
export class StateModule {
}
