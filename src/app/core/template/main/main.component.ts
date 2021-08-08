import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserFacade } from "@state/user/user.facade";
import { SubjectFacade } from "@state/subject/subject.facade";
import { NoteFacade } from "@state/note/note.facade";
import { Router } from "@angular/router";
import { Routers } from "@core/enums/routers.enum";
import { NoteSubjectCreateDto } from "@models/subject.interface";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {

  public userState$ = this.userFacade.state$;
  public subjectState$ = this.subjectFacade.state$;
  public noteState$ = this.noteFacade.state$;

  constructor(
    private userFacade: UserFacade,
    private subjectFacade: SubjectFacade,
    private noteFacade: NoteFacade,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.subjectFacade.getAll();
    this.noteFacade.getAll();
  }

  editNote(id: number) {
    this.router.navigate(['edit', id]);
  }

  logout() {
    this.userFacade.logout().subscribe(() => {
      this.router.navigate([Routers.login]);
    });
  }

  createSubject(dto: NoteSubjectCreateDto) {
    this.subjectFacade.create(dto);
  }
}
