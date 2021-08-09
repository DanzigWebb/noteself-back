import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent implements OnInit {

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

  delete() {
    this.onDelete.emit();
  }
}
