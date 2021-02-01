import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() type: 'main' | 'secondary' | 'transparent';
  @Input() text: string;
  @Output() buttonClick = new EventEmitter();
  @Input() disabled: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
