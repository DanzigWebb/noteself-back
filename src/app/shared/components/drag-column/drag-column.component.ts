import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from "@angular/common";

enum ScrollLimits {
  min        = 100,
  extremeMin = 100,
  max        = 700,
}

@Component({
  selector: 'app-drag-column',
  templateUrl: './drag-column.component.html',
  styleUrls: ['./drag-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragColumnComponent implements OnInit {

  @ViewChild('column') column!: ElementRef;

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
    const document = this.doc;
    const navbar = this.column.nativeElement;

    let startX: any;
    let startWidth: any;

    startX = e.clientX;
    startWidth = parseInt(getComputedStyle(navbar, null).width);
    document.documentElement.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseup", end);


    function move(e: MouseEvent): void {
      const setWidth = (): number => {
        const width = startWidth + e.clientX - startX;
        if (width >= ScrollLimits.max) {
          return ScrollLimits.max;
        } else if (width <= ScrollLimits.min) {
          return ScrollLimits.min;
        }
        return width;
      };

      navbar.style.width = `${setWidth()}px`;
    }

    function end(): void {
      document.documentElement.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseup", end);
    }
  }
}
