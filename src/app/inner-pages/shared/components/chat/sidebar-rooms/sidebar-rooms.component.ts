import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromChats from 'app/core/chats/store/chat.reducer';
import * as chatActions from 'app/core/chats/store/chats.actions';
import * as fromCore from 'app/core/reducers';
import { ConversationModel, UserInfo } from 'app/shared/models';
import { NotificationsService, WebsocketService } from 'app/shared/services';
import { ConversationMemberModel } from 'app/shared/models/conversation-member.model';
import { ConversationTypeEnum } from 'app/shared/enums';
import { CHAT_ONLINE_DELTA_MS } from 'app/constants/constants';

@Component({
  selector: 'app-sidebar-rooms',
  templateUrl: './sidebar-rooms.component.html',
  styleUrls: [ './sidebar-rooms.component.scss' ]
})
export class SidebarRoomsComponent implements OnInit {
  @Input() user: UserInfo;
  @Input() chat: fromChats.State;

  public searchFC: FormControl = new FormControl('', [ Validators.required, Validators.maxLength(32) ]);

  constructor(
    private store: Store<fromCore.State>,
    private notificationsService: NotificationsService,
    private websocketService: WebsocketService
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(chatActions.getConversationsByUserId({ id: this.user.id }));

    this.websocketService.receivedOnline().subscribe((data) => {
      this.store.dispatch(chatActions.updateParticipantLastSeen(data));
    });
  }

  onConversationsSearch(): void {
    if (this.searchFC.enabled) {
      if (this.searchFC.value && this.searchFC.valid) {
        this.store.dispatch(chatActions.searchConversations({ id: this.user.id, search: this.searchFC.value }));
      } else {
        this.notificationsService.message.emit({
          type: 'error',
          message: 'Search request must be more 0 and less than 32 chars!'
        });
      }
    }
  }

  onConversationClick(chatId: string): void {
    if (chatId !== this.chat.conversations.active) {
      this.store.dispatch(chatActions.setActiveConversation({ id: chatId }));
      this.websocketService.joinChat(this.user, chatId);
    }
  }

  @HostListener('document:keydown.escape')
  onKeydownHandler(): void {
    this.store.dispatch(chatActions.cancelActiveConversation());
  }

  onConversationSearchCancel(value: string): void {
    if (!value.length) {
      this.store.dispatch(chatActions.getConversationsByUserId({ id: this.user.id }));
      this.store.dispatch(chatActions.searchConversationsCancel());
    }
  }

  getConversationPartners(conv: ConversationModel): ConversationMemberModel[] {
    return conv.participants.filter((participant) => participant.user.id !== this.user.id);
  }

  getConversationPartnerName(conv: ConversationModel): string {
    const partners: ConversationMemberModel[] = this.getConversationPartners(conv);
    return (conv.type === ConversationTypeEnum.Private) ?
      `${partners[0].user.firstName} ${partners[0].user.lastName}` :
      `${partners.length} partners`;
  }

  isConversationPartnerOnline(conv: ConversationModel): boolean { // true - online, false - offline, null - not a private conversation
    const partners: ConversationMemberModel[] = this.getConversationPartners(conv);

    return (conv.type === ConversationTypeEnum.Private) ?
      new Date().getTime() - new Date(partners[0].user.lastSeen).getTime() < CHAT_ONLINE_DELTA_MS :
      null;
  }
}
