import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { NoteSubjectCreateDto } from "@models/subject.interface";
import { MatMenuTrigger } from "@angular/material/menu";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-navbar-new-subject',
  templateUrl: './navbar-new-subject.component.html',
  styleUrls: ['./navbar-new-subject.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarNewSubjectComponent implements OnInit, OnDestroy {

  @ViewChild('titleInput') private titleInput!: ElementRef<HTMLInputElement>;

  @Output() onSubmit = new EventEmitter<NoteSubjectCreateDto>();

  @Input() menu: MatMenuTrigger | null = null;

  title = new FormControl(null, [Validators.required]);
  description = new FormControl(null);

  private unsubscribe$ = new Subject();

  ngOnInit(): void {
    this.menu?.menuOpened
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.resetForm();
        this.titleInput?.nativeElement.focus();
      });
  }

  submit(): void {
    this.title.markAllAsTouched();

    if (this.title.valid) {
      const dto: NoteSubjectCreateDto = this.createDto();
      this.onSubmit.emit(dto);
      this.menu?.closeMenu();
    }
  }

  private createDto(): NoteSubjectCreateDto {
    return {
      title: this.title.value,
      description: this.description.value || '',
    };
  }

  private resetForm(): void {
    this.description.reset();
    this.title.reset();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
