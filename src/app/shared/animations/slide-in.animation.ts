import { animate, style, transition, trigger } from '@angular/animations';

export const slideInAnimation = trigger('slideIn', [
    transition(':enter', [
      style({ opacity: 0, position: 'absolute', width: '100%', top: '-5px' }),
      animate('300ms ease-in', style({ opacity: 1, position: 'absolute', width: '100%', top: 0 }))
    ])
  ]);
