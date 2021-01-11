import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() type: 'main' | 'secondary' | 'transparent';
  @Input() text: string;
  @Input() disabled: boolean;
  @Output() buttonClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
