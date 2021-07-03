import { animate, style, transition, trigger } from '@angular/animations';

export const slideInLeftAnimation = trigger('slideInLeft', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-25px)' }),
    animate('100ms ease-in', style({ opacity: 1, transform: 'translateX(0)' }))
  ])
]);
