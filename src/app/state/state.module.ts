import { NgModule } from '@angular/core';
import { UserFacade } from "@state/user/user.facade";
import { NgxsModule } from "@ngxs/store";
import { UserState } from "@state/user/user.state";
import { environment } from "@src/environments/environment";
import { NoteFacade } from "@state/note/note.facade";
import { NoteState } from "@state/note/note.state";
import { SubjectFacade } from "@state/subject/subject.facade";
import { SubjectState } from "@state/subject/subject.state";


@NgModule({
  providers: [UserFacade, NoteFacade, SubjectFacade],
  imports: [
    NgxsModule.forRoot(
      [
        UserState,
        NoteState,
        SubjectState,
      ],
      {
        developmentMode: !environment.production,
      },
    ),
  ],
})
export class StateModule {
}
