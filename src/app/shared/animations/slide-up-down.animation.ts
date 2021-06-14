import { animate, style, transition, trigger } from '@angular/animations';

export const slideUpDownAnimation = trigger('slideUpDown', [
  transition(':enter', [
    style({ bottom: '{{ from }}px' }),
    animate('150ms ease-in', style({ bottom: '{{ to }}px' }))
  ]),
  transition(':leave', [
    style({ bottom: '{{ to }}px' }),
    animate('150ms ease-in', style({ bottom: '{{ from }}px' }))
  ])
]);
