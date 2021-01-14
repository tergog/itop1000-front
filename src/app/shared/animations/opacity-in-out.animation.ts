import { animate, style, transition, trigger } from '@angular/animations';

export const opacityInOutAnimation = trigger('opacityInOut', [
  transition(':enter', [
    style({ top: '{{ from }}px', opacity: 0 }),
    animate('200ms ease-in', style({ top: '{{to}}px', opacity: 1 }))
  ]),
  transition(':leave', [
    style({ top: '{{ to }}px', opacity: 1 }),
    animate('200ms ease-in', style({ top: '{{from}}px', opacity: 0 }))
  ])
]);
