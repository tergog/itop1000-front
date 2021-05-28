import { Component, Output, EventEmitter } from '@angular/core';
import { ContentChange } from 'ngx-quill';
import 'quill-emoji';

import { NotificationsService } from 'app/shared/services';
import { ISharedQuillInstance } from 'app/shared/models';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: [ './rich-text-editor.component.scss' ]
})
export class RichTextEditorComponent {
  constructor(
    private notificationsService: NotificationsService
  ) {
  }

  public textContent: string = '';

  @Output() shareTextContent = new EventEmitter<ContentChange>();
  textContentChange(value: ContentChange): void {
    this.shareTextContent.emit(value);
  }

  @Output() shareQuillInstance = new EventEmitter<any>();
  getEditorInstance(quill: ISharedQuillInstance): void {
    this.shareQuillInstance.emit(quill);
  }

  @Output() shareSendButtonClick = new EventEmitter<MouseEvent>();
  onSendButtonClick(evt: MouseEvent): void {
    this.shareSendButtonClick.emit(evt);
  }

  public quillModules = {
    toolbar: {
      container: '.chat__text-editor__header__toolbar'
    },
    attachFiles: {
      button: '.ql-attach-file',
      errorEmmiter: this.notificationsService.message
    },
    'emoji-toolbar': true
  };
}
