import { Component } from '@angular/core';

@Component({
  selector: 'app-wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.scss']
})
export class WysiwygComponent {
  public inputText: String = '';

  constructor() { }

  onBoldClick() {
    alert(this.inputText);
  }
}
