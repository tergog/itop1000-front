import {
  AfterViewInit,
  Component,
  ElementRef,
  Input, OnChanges, OnDestroy,
  OnInit, QueryList, SimpleChanges,
  ViewChild, ViewChildren
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ContentChange } from 'ngx-quill';
import { iif, of } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, switchMap, take, tap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ChatService, NotificationsService, WebsocketService } from 'app/shared/services';
import {
  ConversationMemberModel,
  ConversationModel,
  SharedQuillInstanceModel,
  UserInfo
} from 'app/shared/models';
import * as fromCore from 'app/core/reducers';
import * as fromChat from 'app/core/chats/store/chat.reducer';
import * as chatActions from 'app/core/chats/store/chats.actions';
import { addNewMessage } from 'app/core/chats/store/chats.actions';
import { slideInLeftAnimation } from 'app/shared/animations';
import { ENotificationStatus } from 'app/shared/enums/notification-status.enum';
import { EConversationTypeEnum } from 'app/shared/enums';
import { CHAT_MESSAGES_PER_PAGE, CHAT_ONLINE_DELTA_MS } from 'app/constants/constants';

@UntilDestroy()
@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: [ './message-box.component.scss' ],
  animations: [ slideInLeftAnimation ]
})
export class MessageBoxComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() user: UserInfo;
  @Input() chat: fromChat.State;
  @ViewChild('messages') messagesWrapper: ElementRef;
  @ViewChildren('messageContainer') messageContainers: QueryList<ElementRef>;

  private textEditorInstance: SharedQuillInstanceModel;
  private textContent: ContentChange;
  private pageLoaded: number = 1;

  public userTyping: string = null;
  public searchFC: FormControl = new FormControl('', [ Validators.maxLength(32) ]);

  constructor(
    private websocketService: WebsocketService,
    private chatService: ChatService,
    private store: Store<fromCore.State>,
    private notificationsService: NotificationsService
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(chatActions.getConverastionMessages({
      convId: this.chat.conversations.active,
      page: this.pageLoaded++,
      count: CHAT_MESSAGES_PER_PAGE
    }));

    // Typeahead searching
    this.searchFC.valueChanges.pipe(
      untilDestroyed(this),
      debounceTime(500),
      distinctUntilChanged(),
      tap((term) => this.searchFC.valid && this.store.dispatch(chatActions.searchMessages({
        userId: this.user.id,
        convId: this.chat.conversations.active,
        term
      })))
    ).subscribe();


    this.websocketService.receivedNewMessage().pipe(
      untilDestroyed(this),
      switchMap((message) => iif(
        () => message.chat === this.chat.conversations.active,
        of(undefined).pipe(tap(() => {
          this.store.dispatch(addNewMessage(message));

          const $msgWrpr = this.messagesWrapper.nativeElement;
          if ($msgWrpr.clientHeight + $msgWrpr.scrollTop === $msgWrpr.scrollHeight) { // If scroll is at bottom
            this.expectChangesThanScroll();
          }
          // Show notification on scroll-bottom element
        }))
      ))
    ).subscribe();

    this.websocketService.receivedTyping().pipe(
      untilDestroyed(this),
      switchMap(({ chatId, username }) => iif(
        () => chatId === this.chat.conversations.active,
        of(undefined).pipe(
          tap(() => this.userTyping = username),
          delay(3000),
          tap(() => this.userTyping = null)
        )
      ))
    ).subscribe();
  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit(): void {
    this.expectChangesThanScroll();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(!changes.chat?.firstChange && changes.chat?.previousValue?.conversations.active !== changes.chat?.currentValue.conversations.active) {
      this.pageLoaded = 1;

      this.store.dispatch(chatActions.getConverastionMessages({
        convId: this.chat.conversations.active,
        page: this.pageLoaded++,
        count: CHAT_MESSAGES_PER_PAGE
      }));

      this.expectChangesThanScroll();
    }
  }

  getEditorInstance(quill: SharedQuillInstanceModel): void {
    this.textEditorInstance = quill;
  }

  textContentChange(value: ContentChange): void {
    this.textContent = value;
    this.websocketService.typing({
      username: `${this.user.firstName} ${this.user.lastName}`,
      userId: this.user.id,
      chatId: this.chat.conversations.active
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
        this.expectChangesThanScroll();
      });
      this.textEditorInstance.setContents([ { insert: '\n' } ]); // Clear editor input
    }
  }

  onMessagesSearch(): void {
    if (this.searchFC.enabled) {
      if (this.searchFC.value && this.searchFC.valid) {
        // Search
      } else {
        this.notificationsService.message.emit({
          type: ENotificationStatus.Error,
          message: 'Search request must be more 0 and less than 32 chars!'
        });
      }
    }
  }

  onHistoryScroll(): void {
    if (this.messagesWrapper?.nativeElement.scrollTop === 0 && this.chat.messages.data.length >= CHAT_MESSAGES_PER_PAGE &&
      this.chat.messages.data.length < this.getActiveConversationById(this.chat.conversations.active).messages.total) {
      this.store.dispatch(chatActions.getConverastionMessages({
        convId: this.chat.conversations.active,
        page: this.pageLoaded++,
        count: CHAT_MESSAGES_PER_PAGE
      }))
    }
  }

  onScrollBottomClick(): void {
    this.expectChangesThanScroll(true);
  }

  expectChangesThanScroll(force: boolean = false): void {
    if (force) {
      this.scrollToElement(this.messageContainers.last.nativeElement);
    }
    else {
      this.messageContainers.changes
        .pipe(take(2)) // take(2) instead first() for fix bug when history isnt scrolls
        .subscribe((list: QueryList<ElementRef>) => {
          if (this.chat.conversations.active !== null && list.length > 0) {
            this.scrollToElement(list.last.nativeElement);
          }
        });
    }
  }

  getActiveConversation(chatId: string): ConversationModel {
    return chatId !== null ?
      this.chat.conversations.data.filter((conv) => conv.id === chatId)[0] :
      null;
  }

  messageTimeFormat(dateStr: string): string {
    const date = new Date(dateStr);
    const hh = String((date.getHours() + 24) % 12).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const now = new Date();
    const timeStr = `${hh}:${mm} ${date.getHours() > 11 ? 'PM' : 'AM'}`;

    if (now.getDate() !== date.getDate()) { // Not today
      const YY = date.getFullYear();
      const MM = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ][date.getMonth()];
      const DD = String(date.getDate()).padStart(2, '0');

      return `${MM} ${DD}, ${YY} ${timeStr}`;
    } else { // Today
      return timeStr;
    }
  }

  getConversationPartners(conv: ConversationModel): ConversationMemberModel[] {
    return conv.participants.filter((participant) => participant.user.id !== this.user.id);
  }

  getConversationPartnerName(activeConv: string): string {
    const conv: ConversationModel = this.getActiveConversation(activeConv);
    const partner: ConversationMemberModel = this.getConversationPartners(conv)[0];
    return `${partner.user.firstName} ${partner.user.lastName}`;
  }

  getActiveConversationById(convId: string): ConversationModel {
    return this.chat.conversations.data.filter((conv) => conv.id === convId)[0];
  }

  isConversationPartnerOnline(convId: string): boolean { // true - online, false - offline, null - not a private conversation
    const conv = this.getActiveConversationById(convId);
    const partners: ConversationMemberModel[] = this.getConversationPartners(conv);

    return (conv.type === EConversationTypeEnum.Private) ?
      new Date().getTime() - new Date(partners[0].user.lastSeen).getTime() < CHAT_ONLINE_DELTA_MS :
      null;
  }

  isScrollerToBottomVisible(): boolean {
    return this.messagesWrapper?.nativeElement.scrollHeight - this.messagesWrapper?.nativeElement.scrollTop > 500;
  }

  scrollToElement($element: HTMLElement): void {
    /**
     * setTimeout used even in official angular example
     * Check method "calculateSerializedPanes" in https://angular.io/api/core/ViewChildren#another-example
     */
    setTimeout(() => {
      $element.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    });
  }
}
