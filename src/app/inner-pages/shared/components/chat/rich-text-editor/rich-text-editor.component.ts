import { Component, Output, EventEmitter, ApplicationRef } from '@angular/core';
import { ContentChange } from 'ngx-quill';
import 'quill-emoji';

import { NotificationsService } from 'app/shared/services';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: [ './rich-text-editor.component.scss' ]
})
export class RichTextEditorComponent {
  constructor(
    private notificationsService: NotificationsService
  ) {}

  public textContent: string = '';

  @Output() shareTextContent = new EventEmitter<ContentChange>();
  textContentChange(value: ContentChange): void {
    this.shareTextContent.emit(value);
  }

  public quillModules = {
    toolbar: {
      container: '.chat__text-editor__toolbar'
    },
    verticalSpacing: {
      root: '.chat__text-editor',
      btnInc: '.ql-spacing__inc',
      btnDec: '.ql-spacing__dec',
      input: '#ql-spacing',
      spacing: 1
    },
    attachFiles: {
      button: '.ql-attach-file',
      errorEmmiter: this.notificationsService.message
    },
    "emoji-toolbar": true
  };
}