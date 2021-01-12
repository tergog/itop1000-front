import { Component, Output, EventEmitter } from '@angular/core';
import { ContentChange } from 'ngx-quill';
import 'quill-emoji';

import { NotificationsService } from 'app/shared/services';
import { SharedQuillInstanceModel } from 'app/shared/models';

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

  @Output() shareQuillInstance = new EventEmitter<any>();
  getEditorInstance(quill: SharedQuillInstanceModel): void {
    this.shareQuillInstance.emit(quill);
  }

  public quillModules = {
    toolbar: {
      container: '.chat__text-editor__toolbar'
    },
    attachFiles: {
      button: '.ql-attach-file',
      errorEmmiter: this.notificationsService.message
    },
    counterModule: {
      container: '.ql-counter',
      maxLength: 4096
    },
    "emoji-toolbar": true
  };
}
