import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromChats from 'app/core/chats/store/chat.reducer';
import * as fromCore from 'app/core/reducers';
import { ConversationModel, UserInfo } from 'app/shared/models';
import { FormControl, Validators } from '@angular/forms';
import {
  cancelActiveConversation,
  getConversationsByUserId,
  searchConversations, searchConversationsCancel,
  setActiveConversation
} from 'app/core/chats/store/chats.actions';
import { ChatService, NotificationsService } from 'app/shared/services';
import { ConversationMemberModel } from 'app/shared/models/conversation-member.model';

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
    private chatService: ChatService
  ) {
  }

  ngOnInit() {
    this.store.dispatch(getConversationsByUserId({ id: this.user.id }));
  }

  onConversationsSearch(): void {
    if (this.searchFC.enabled) {
      if (this.searchFC.value && this.searchFC.valid) {
        this.store.dispatch(searchConversations({ id: this.user.id, search: this.searchFC.value }));
      } else {
        this.notificationsService.message.emit({
          type: 'error',
          message: 'Search request must be more 0 and less than 32 chars!'
        });
      }
    }
  }

  onConversationClick(chatId: string): void {
    this.store.dispatch(setActiveConversation({ id: chatId }));
  }

  @HostListener('document:keydown.escape')
  onKeydownHandler(): void {
    this.store.dispatch(cancelActiveConversation());
  }

  onConversationSearchCancel(value: string): void {
    if (!value.length) {
      this.store.dispatch(getConversationsByUserId({ id: this.user.id }));
      this.store.dispatch(searchConversationsCancel());
    }
  }

  getConversationPartners(conv: ConversationModel): ConversationMemberModel[] {
    return conv.participants.filter((participant) => participant.user.id !== this.user.id);
  }

  getConversationPartnerName(conv: ConversationModel): string {
    const partners: ConversationMemberModel[] = this.getConversationPartners(conv);
    return `${partners[0].user.firstName} ${partners[0].user.lastName}`;
  }

  // async getUnreadMessages(conv: ConversationModel): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     this.chatService.getUnreadMessagesByConversationId(conv.id).subscribe((data:{ unreadCount: string } ) => resolve(data.unreadCount), (err) => reject(err));
  //   });
  // }
}
