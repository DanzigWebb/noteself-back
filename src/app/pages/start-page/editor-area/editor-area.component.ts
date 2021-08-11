import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Note, NoteUpdateDto } from "@models/note.interface";
import { NoteFacade } from "@state/note/note.facade";
import { DOCUMENT } from "@angular/common";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-editor-area',
  templateUrl: './editor-area.component.html',
  styleUrls: ['./editor-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorAreaComponent implements OnInit, OnChanges {
  @ViewChild('titleField') private titleField!: ElementRef;
  @ViewChild('descriptionField') private descriptionField!: ElementRef;

  @Input() note: Note | null = null;

  title = new FormControl();
  description = new FormControl();

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private noteFacade: NoteFacade,
  ) {
  }

  ngOnInit(): void {
    this.title.valueChanges.subscribe(() => {
      queueMicrotask(() => {
        this.updateNote();
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.note) {
      this.title.setValue(this.note.title);
      this.description.setValue(this.note.description);
    }
  }

  formatDoc(command: string, attr?: string) {
    this.title.disable();
    this.doc.execCommand(command, false, attr);
    this.title.enable();
  }

  saveNote() {
    if (this.note) {
      const dto: NoteUpdateDto = this.createDto();
      const id = this.note.id;

      this.noteFacade.save(dto, id);
    }
  }

  updateNote() {
    const dto = this.createDto();
    const note = <Note>{
      ...this.note,
      title: dto.title,
      description: dto.description,
    };

    this.noteFacade.update(note);
  }

  createDto(): NoteUpdateDto {
    return {
      title: this.title.value,
      description: this.description.value,
      subject: this.note?.subject || null,
    };
  }
}
