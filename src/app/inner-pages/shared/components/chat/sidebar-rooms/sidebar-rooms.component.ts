import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import * as fromChats from 'app/core/chats/store/chat.reducer';
import * as chatActions from 'app/core/chats/store/chats.actions';
import * as fromCore from 'app/core/reducers';
import { ConversationModel, UserInfo } from 'app/shared/models';
import { NotificationsService, WebsocketService } from 'app/shared/services';
import { ConversationMemberModel } from 'app/shared/models/conversation-member.model';
import { EConversationTypeEnum } from 'app/shared/enums';
import { CHAT_ONLINE_DELTA_MS } from 'app/constants/constants';

@UntilDestroy()
@Component({
  selector: 'app-sidebar-rooms',
  templateUrl: './sidebar-rooms.component.html',
  styleUrls: [ './sidebar-rooms.component.scss' ]
})
export class SidebarRoomsComponent implements OnInit, OnDestroy {
  @Input() user: UserInfo;
  @Input() chat: fromChats.State;

  @ViewChild('search', { read: ElementRef }) searchInput: ElementRef;

  public searchFC: FormControl = new FormControl('', [ Validators.maxLength(32) ]);

  constructor(
    private store: Store<fromCore.State>,
    private notificationsService: NotificationsService,
    private websocketService: WebsocketService
  ) {
  }

  ngOnInit(): void {
    this.searchFC.valueChanges.pipe(
      untilDestroyed(this),
      debounceTime(500),
      distinctUntilChanged(),
      tap((term) => this.searchFC.valid && this.store.dispatch(chatActions.searchConversations({ userId: this.user.id, term })))
    ).subscribe();

    this.websocketService.receivedOnline().subscribe((data) => {
      this.store.dispatch(chatActions.updateParticipantLastSeen(data));
    });
  }

  ngOnDestroy(): void {
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

  getConversationPartners(conv: ConversationModel): ConversationMemberModel[] {
    return conv.participants.filter((participant) => participant.user.id !== this.user.id);
  }

  getConversationPartnerName(conv: ConversationModel): string {
    const partners: ConversationMemberModel[] = this.getConversationPartners(conv);
    return (conv.type === EConversationTypeEnum.Private) ?
      `${partners[0].user.firstName} ${partners[0].user.lastName}` :
      `${partners.length} partners`;
  }

  isConversationPartnerOnline(conv: ConversationModel): boolean { // true - online, false - offline, null - not a private conversation
    const partners: ConversationMemberModel[] = this.getConversationPartners(conv);

    return (conv.type === EConversationTypeEnum.Private) ?
      new Date().getTime() - new Date(partners[0].user.lastSeen).getTime() < CHAT_ONLINE_DELTA_MS :
      null;
  }
}
