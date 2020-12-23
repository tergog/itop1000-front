import { Component, OnInit } from '@angular/core';
import { ContentChange } from 'ngx-quill';

import { NotificationsService } from 'app/shared/services';
import { NotificationMessage } from 'app/shared/models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  constructor(
    private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {
  }

  onTextContent(evt: ContentChange): void {
    console.log(evt);
    // Do something
  }

  onEditorError(message: NotificationMessage): void {
    this.notificationsService.message.emit(message);
  }
}
