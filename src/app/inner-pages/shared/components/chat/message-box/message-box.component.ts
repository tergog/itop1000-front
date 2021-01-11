import { AfterViewChecked, Component, ElementRef, HostListener, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ContentChange } from 'ngx-quill';

import { ChatService, NotificationsService, WebsocketService } from 'app/shared/services';
import {
  ConversationMemberModel,
  ConversationMessageModel,
  ConversationModel,
  SharedQuillInstanceModel,
  UserInfo
} from 'app/shared/models';
import * as fromCore from 'app/core/reducers';
import * as fromChat from 'app/core/chats/store/chat.reducer';
import { addNewMessage, cancelActiveConversation } from 'app/core/chats/store/chats.actions';
import { delay, switchMap, tap } from 'rxjs/operators';
import { iif, of } from 'rxjs';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: [ './message-box.component.scss' ]
})
export class MessageBoxComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() user: UserInfo;
  @Input() chat: fromChat.State;
  @ViewChild('messages') messagesContainer: ElementRef;

  private textEditorInstance: SharedQuillInstanceModel;
  private textContent: ContentChange;

  public userTyping: string = null;
  public searchFC: FormControl = new FormControl('', [ Validators.required, Validators.maxLength(32) ]);

  constructor(
    private websocketService: WebsocketService,
    private chatService: ChatService,
    private store: Store<fromCore.State>,
    private notificationsService: NotificationsService
  ) {
  }

  ngOnInit(): void {
    this.websocketService.receivedNewMessage().pipe(
      switchMap((message) => iif(
        () => message.chat === this.chat.conversations.active,
        of(undefined).pipe(tap(() => this.store.dispatch(addNewMessage(message)))),
        of(undefined).pipe(tap(() => this.notificationsService.message.emit({
          type: 'success',
          message: 'You have new message from ...!'
        })))
      ))
    ).subscribe();

    this.websocketService.receivedTyping().pipe(
      switchMap(({ chat, username }) => iif(
        () => chat === this.chat.conversations.active,
        of(undefined).pipe(
          tap(() => this.userTyping = username),
          delay(3000),
          tap(() => this.userTyping = null)
        )
      ))
    ).subscribe();

    this.websocketService.receivedBeingOnline().pipe(
      // Make the little circle below a user avatar yellow
    ).subscribe();
  }

  ngOnChanges(): void {
    if (this.chat.conversations.active !== null) { // Send 'join' only when a user click on the conversation
      this.websocketService.joinChat(this.user, this.chat.conversations.active);
      this.websocketService.beingOnline(this.user);
    }
  }

  ngAfterViewChecked(): void { // Scroll to last message when view updated
    this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
  }

  getEditorInstance(quill: SharedQuillInstanceModel): void {
    this.textEditorInstance = quill;
  }

  textContentChange(value: ContentChange): void {
    this.textContent = value;
    this.websocketService.typing({
      username: `${this.user.firstName} ${this.user.lastName}`,
      chat: this.chat.conversations.active
    });
  }

  sendButtonClick(): void {
    if (this.textContent && this.textContent.html && this.chat.conversations.active) {
      this.websocketService.sendConversationMessage({
        chat: this.chat.conversations.active,
        sender: this.user.id,
        message: this.textContent.html
      }, (savedMessage) => {
        this.store.dispatch(addNewMessage(savedMessage));
        // Make sender online (?)
      });
      this.textEditorInstance.setContents([{ insert: '\n' }]); // Clear editor input
    }
  }

  @HostListener('document:keydown.enter')
  onKeydownHandler(): void {
    if (this.textEditorInstance.hasFocus()) {
      this.sendButtonClick();
    }
  }

  onMessagesSearch(): void {
    if (this.searchFC.enabled) {
      if (this.searchFC.value && this.searchFC.valid) {
        // Search
      } else {
        this.notificationsService.message.emit({
          type: 'error',
          message: 'Search request must be more 0 and less than 32 chars!'
        });
      }
    }
  }

  getActiveConversation(chatId: string): ConversationModel {
    if (chatId === null) { return null; }
    return this.chat.conversations.data.filter((conv) => conv.id === chatId)[0];
  }

  messageTimeFormat(dateStr: string): string {
    const date = new Date(dateStr);
    const hh = String((date.getHours() + 24) % 12).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const now = new Date();
    const timeStr = `${hh}:${mm} ${date.getHours() > 11 ? 'PM' : 'AM'}`;

    if (now.getFullYear() !== date.getFullYear() && now.getMonth() !== date.getMonth() && now.getDate() !== date.getDate()) { // Not today
      const YY = date.getFullYear();
      const MM = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ][date.getMonth()];
      const DD = String(date.getDate()).padStart(2, '0');

      return `${MM} ${DD}, ${YY} ${timeStr}`;
    }
    else { // Today
      return timeStr;
    }
  }

  getMessageWhom(message: ConversationMessageModel): string {
    return message.sender.user.id === this.user.id ?
      this.getConversationPartnerName(this.chat.conversations.active) :
      `${this.user.firstName} ${this.user.lastName}`;
  }

  getConversationPartners(conv: ConversationModel): ConversationMemberModel[] {
    return conv.participants.filter((participant) => participant.user.id !== this.user.id);
  }

  getConversationPartnerName(activeConv: string): string {
    const conv: ConversationModel = this.getActiveConversation(activeConv);
    const partner: ConversationMemberModel = this.getConversationPartners(conv)[0];
    return `${partner.user.firstName} ${partner.user.lastName}`;
  }
}
