import { animate, state, style, transition, trigger } from "@angular/animations";

export const SlideAnimation = [
  trigger('SlideAnimation', [
    state('open', style({
      width: '*',
    })),
    state('closed', style({
      width: '0px'
    })),
    transition('open => closed', [
      animate('0.25s ease')
    ]),
    transition('closed => open', [
      animate('0.25s ease')
    ]),
  ]),
]
