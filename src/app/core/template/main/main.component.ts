import { Component, OnInit } from '@angular/core';
import { UserFacade } from "@state/user/user.facade";
import { SubjectFacade } from "@state/subject/subject.facade";
import { NoteFacade } from "@state/note/note.facade";
import { Router } from "@angular/router";
import { Routers } from "@core/enums/routers.enum";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  public userState$ = this.userFacade.state$;

  constructor(
    private userFacade: UserFacade,
    private subjectFacade: SubjectFacade,
    private noteFacade: NoteFacade,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  checkNote(id: number) {
    this.router.navigate(['edit', id]);
  }

  logout() {
    this.userFacade.logout().subscribe(() => {
      this.router.navigate([Routers.login]);
    });
  }

  createNote() {
    this.noteFacade.create();
  }

  deleteNote(id: number) {
    this.noteFacade.delete(id);
  }
}
