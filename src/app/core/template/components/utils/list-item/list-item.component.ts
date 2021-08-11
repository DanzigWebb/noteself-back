import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent implements OnInit, OnChanges {

  @Output() onDelete = new EventEmitter();

  @Input() title = '';
  @Input() description = '';
  @Input() updatedAt: Date | null = null;
  @Input() isActive = false;
  @Input() withMenu = false;
  @Input() icon = 'folder';
  @Input() color: 'accent' | 'primary' | 'warn' = 'primary';

  constructor() {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.title = this.parseText(this.title);
    this.description = this.parseText(this.description);
  }

  parseText(item: string) {
    const parser = new DOMParser();
    const el = parser.parseFromString(item, 'text/html');
    return el.querySelector('body')?.innerText.trim() || '';
  }

  delete() {
    this.onDelete.emit();
  }
}
