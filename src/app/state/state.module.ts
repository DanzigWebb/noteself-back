import { NgModule } from '@angular/core';
import { UserFacade } from "@state/user/user.facade";
import { NgxsModule } from "@ngxs/store";
import { UserState } from "@state/user/user.state";
import { environment } from "@src/environments/environment";
import { NoteFacade } from "@state/note/note.facade";
import { NoteState } from "@state/note/note.state";
import { SubjectFacade } from "@state/subject/subject.facade";
import { SubjectState } from "@state/subject/subject.state";
import { UiState } from "@state/ui/ui.state";
import { UiFacade } from "@state/ui/ui.facade";


@NgModule({
  providers: [
    UserFacade,
    NoteFacade,
    SubjectFacade,
    UiFacade,
  ],
  imports: [
    NgxsModule.forRoot(
      [
        UserState,
        NoteState,
        SubjectState,
        UiState,
      ],
      {
        developmentMode: !environment.production,
      },
    ),
  ],
})
export class StateModule {
}
