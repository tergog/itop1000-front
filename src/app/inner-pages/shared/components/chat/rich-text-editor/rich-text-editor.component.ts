import { Component, Output, EventEmitter } from '@angular/core';
import { ContentChange } from 'ngx-quill';
import 'quill-emoji';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: [ './rich-text-editor.component.scss' ]
})
export class RichTextEditorComponent {
  public textContent: string = '';

  @Output() shareTextContent = new EventEmitter<ContentChange>();
  textContentChange(value: ContentChange): void {
    this.shareTextContent.emit(value);
  }
}