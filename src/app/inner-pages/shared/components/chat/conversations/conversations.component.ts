import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromChats from 'app/core/chats/store/chat.reducer';
import * as fromCore from 'app/core/reducers';
import * as chatActions from 'app/core/chats/store/chats.actions';
import { WebsocketService } from 'app/shared/services';
import { UserInfo } from 'app/shared/models';
import { ChatUtilsService } from 'app/shared/services/chat-utils.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: [ './conversations.component.scss' ]
})
export class ConversationsComponent implements OnInit {
  @Input() user: UserInfo;
  @Input() chat: fromChats.State;

  constructor(
    public chatUtilsService: ChatUtilsService,
    private websocketService: WebsocketService,
    private store: Store<fromCore.State>,
  ) {
  }

  ngOnInit(): void {
    this.websocketService.receivedOnline().subscribe((data) => {
      this.store.dispatch(chatActions.updateParticipantLastSeen(data));
    });
  }

  onConversationClick(chatId: string): void {
    if (chatId !== this.chat.conversations.active) {
      this.store.dispatch(chatActions.setActiveConversation({ convId: chatId }));
      this.websocketService.joinChat(this.user.id, chatId);
    }
  }

  @HostListener('document:keydown.escape')
  onKeydownHandler(): void {
    this.store.dispatch(chatActions.cancelActiveConversation());
  }
}
