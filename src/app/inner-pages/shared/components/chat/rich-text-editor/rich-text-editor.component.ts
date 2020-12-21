import { Component } from '@angular/core';
import 'quill-emoji';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: [ './rich-text-editor.component.scss' ] 
})
export class RichTextEditorComponent {
  public textContent: string = '';
  public quillConfig = {
    toolbar: [
      'bold',
      'italic',
      'underline',
      'strike',
      'emoji',
      // 'font',
      { 'align': [] },
      // row-spacing
      'link',
      'image'
      // attach files
    ],
    "emoji-toolbar": true
  };
}