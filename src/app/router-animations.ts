import {
  trigger,
  animate,
  transition,
  style,
  query,
} from '@angular/animations';


export const fadeAnimation = trigger('fadeAnimation', [
  transition('* <=> *', [
    query(':enter', [
      style({
        opacity: 0,
      }),
    ]),
    query(':enter', [animate('800ms ease', style({ opacity: 1 }))]),
  ]),
]);
