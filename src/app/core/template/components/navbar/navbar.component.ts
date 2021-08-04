import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { SubjectStateModel } from "@state/subject/subject.state";
import { DOCUMENT } from "@angular/common";

enum ScrollLimits {
  min = 100,
  extremeMin = 100,
  max = 700,
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  @ViewChild('nav') navbar!: ElementRef;

  @Input() subjectState: SubjectStateModel | null = null;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
  ) {
  }

  ngOnInit(): void {
  }

  onMouseDown(e: MouseEvent) {
    console.log(e);
    console.log(this.navbar);
    this.start(e);
  }


  // Todo: перенести в директиву
  start(e: any) {
    const document = this.doc;
    const navbar = this.navbar.nativeElement;

    let startX: any;
    let startWidth: any;

    startX = e.clientX;
    startWidth = parseInt(getComputedStyle(navbar, null).width);
    document.documentElement.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseup", end);


    function move(e: any) {
      const setWidth = (): number => {
        const width = startWidth + e.clientX - startX;
        if (width >= ScrollLimits.max) {
          return ScrollLimits.max;
        }  else if (width <= ScrollLimits.extremeMin) {
          navbar.classList.add('hide')
        }
        return width;
      };
      navbar.style.width = `${setWidth()}px`;
    }

    function end() {
      document.documentElement.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseup", end);
    }
  }
}
