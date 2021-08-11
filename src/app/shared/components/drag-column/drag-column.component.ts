import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DOCUMENT } from "@angular/common";

enum ScrollLimits {
  min = 100,
  max = 700,
}

@Component({
  selector: 'app-drag-column',
  templateUrl: './drag-column.component.html',
  styleUrls: ['./drag-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragColumnComponent implements OnInit {

  @ViewChild('column') column!: ElementRef;

  @Input() maxWidth: number = ScrollLimits.max;
  @Input() minWidth: number = ScrollLimits.min;
  @Input() width = 200;

  @Output() onDrag = new EventEmitter<number>();

  private isDrag = false;
  private startX = 0;
  private startWidth = 0;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
  ) {
  }

  ngOnInit(): void {
  }

  onMouseDown(e: MouseEvent) {
    this.start(e);
  }

  start(e: MouseEvent): void {
    this.startWidth = parseInt(getComputedStyle(this.column.nativeElement, null).width);
    this.startX = e.clientX;
    this.isDrag = true;
  }

  @HostListener('window:mousemove', ['$event'])
  move(e: MouseEvent): void {
    if (this.isDrag) {
      const width = this.calculateWidth(e);

      this.onDrag.emit(width);
      this.column.nativeElement.style.width = `${width}px`;
    }
  }

  @HostListener('window:mouseup')
  end(): void {
    this.isDrag = false;
  }

  calculateWidth(e: MouseEvent): number {
    const width = this.startWidth + e.clientX - this.startX;
    if (width >= this.maxWidth) {
      return this.maxWidth;
    } else if (width <= this.minWidth) {
      return this.minWidth;
    }
    return width;
  };
}
