import { animate, style, transition, trigger } from '@angular/animations';

export const marginAnimation = trigger('notification', [
  transition(':enter', [
    style({ opacity: 0, marginTop: '{{from}}px' }),
    animate('300ms', style({ opacity: 1, marginTop: '{{to}}px' })),
  ]),
  transition(':leave', [
    animate('300ms', style({ opacity: 0, marginTop: '{{from}}px' }))
  ])
]);
