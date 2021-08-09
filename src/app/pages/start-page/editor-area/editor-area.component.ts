import {
  ChangeDetectionStrategy,
  Component, ElementRef,
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

interface editorModel {
  title: string;
  description: string;
}

type editorModelType = keyof editorModel

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

  model: editorModel = {
    title: '',
    description: '',
  };

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private noteFacade: NoteFacade,
  ) {
  }

  ngOnInit(): void {
  }

  formatDoc(command: string, attr?: string) {
    this.doc.execCommand(command, false, attr);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.note) {
      this.model.title = this.note.title;
      this.model.description = this.note.description;

      if (this.titleField && this.descriptionField) {
        this.titleField.nativeElement.innerHTML = this.note.title;
        this.descriptionField.nativeElement.innerHTML = this.note.title;
      }
    }
  }

  saveNote() {
    if (this.note) {
      const dto: NoteUpdateDto = this.createDto();
      const id = this.note.id;

      this.noteFacade.update(dto, id);
    }
  }

  createDto(): NoteUpdateDto {
    return {
      title: this.model.title,
      description: this.model.description,
      subject: this.note?.subject || '',
    };
  }

  updateModel(key: editorModelType, value: string) {
    this.model[key] = value;
  }
}
