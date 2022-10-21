import {
  trigger,
  animate,
  transition,
  style,
  query,
  stagger,
  group,
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* <=> *', [
    style({
      opacity: 0,
    }),
    animate('1s ease', style({ opacity: 1 })),
  ]),
]);

export const fadeAnimationEnter = trigger('fadeAnimationEnter', [
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

export const staggerFadeAnimationEnter = trigger('staggerFadeAnimationEnter', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        stagger(50, [animate('0.4s', style({ opacity: 1 }))]),
      ],
      { optional: true }
    ),
  ]),
]);

export const bracketTreeStaggerFadeAnimationEnter = trigger(
  'bracketTreeStaggerFadeAnimationEnter',
  [
    transition('void => *', [
      group([
        query(
          '.column:nth-child(-n+4)',
          [
            style({ opacity: 0 }),
            stagger(50, [animate('0.4s', style({ opacity: 1 }))]),
          ],
          { optional: true }
        ),
        query(
          '.column:nth-last-child(-n+3)',
          [
            style({ opacity: 0 }),
            stagger(-50, [animate('0.4s', style({ opacity: 1 }))]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ]
);
