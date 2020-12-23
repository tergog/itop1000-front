import { Component, EventEmitter, OnInit } from '@angular/core';
import { ContentChange } from 'ngx-quill';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  onTextContent(evt: ContentChange): void {
    console.log(evt);
    // Do something
  }

  onBackButtonClick(): void {

  }

  onSendButtonClick(): void {
    
  }
}
