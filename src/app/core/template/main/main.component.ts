import { Component, OnInit } from '@angular/core';
import { UserFacade } from "@state/user/user.facade";
import { SubjectFacade } from "@state/subject/subject.facade";
import { NoteFacade } from "@state/note/note.facade";
import { Router } from "@angular/router";
import { Routers } from "@core/enums/routers.enum";
import { NoteSubject, NoteSubjectCreateDto } from "@models/subject.interface";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  public userState$ = this.userFacade.state$;
  public subjectState$ = this.subjectFacade.state$;
  public noteState$ = this.noteFacade.state$;

  public checkedSubject$ = this.noteState$.pipe(
    map((s) => s.checkedSubject),
  );

  constructor(
    private userFacade: UserFacade,
    private subjectFacade: SubjectFacade,
    private noteFacade: NoteFacade,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
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

  checkSubject(item: NoteSubject | null) {
    this.noteFacade.checkBySubject(item);
  }

  deleteSubject(subject: NoteSubject) {
    this.subjectFacade.delete(subject.id);
  }

  createNote() {
    this.noteFacade.create();
  }

  deleteNote(id: number) {
    this.noteFacade.delete(id);
  }
}
