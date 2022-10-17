import {
  trigger,
  animate,
  transition,
  style,
  query,
} from '@angular/animations';
import { Optional } from '@angular/core';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({
          opacity: 0,
        }),
      ],
      { optional: true }
    ),
    query(':enter', [animate('800ms ease', style({ opacity: 1 }))], {
      optional: true,
    }),
  ]),
]);
