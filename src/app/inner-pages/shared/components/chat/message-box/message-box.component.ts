import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ContentChange } from 'ngx-quill';
import { debounceTime, distinctUntilChanged, first } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { cloneDeep } from 'lodash';

import { ChatService, WebsocketService } from 'app/shared/services';
import { IConversation, IConversationMember, IConversationMessage, ISharedQuillInstance, IWebsocketTyping, UserInfo } from 'app/shared/models';
import { EConversationType } from 'app/shared/enums';
import * as fromCore from 'app/core/reducers';
import * as fromChat from 'app/core/chats/store/chat.reducer';
import * as chatActions from 'app/core/chats/store/chats.actions';
import { addNewMessage } from 'app/core/chats/store/chats.actions';
import { slideInLeftAnimation, slideUpDownAnimation } from 'app/shared/animations';
import { CHAT_MESSAGES_PER_PAGE, CHAT_ONLINE_DELTA_MS, CHAT_SCROLL_BUFFER, CHAT_TYPING_DURATION } from 'app/constants/constants';

enum EScrollSource {
  USER = 'user',
  API = 'api'
}

interface IScrollBehavior {
  force?: boolean;
  instantly?: boolean;
}

@UntilDestroy()
@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: [ './message-box.component.scss' ],
  animations: [ slideInLeftAnimation, slideUpDownAnimation ]
})
export class MessageBoxComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() user: UserInfo;
  @Input() chat: fromChat.State;
  @ViewChild('messages') messagesWrapper: ElementRef<HTMLElement>;
  @ViewChildren('messageContainer') messageContainers: QueryList<ElementRef<HTMLElement>>;

  private textEditorInstance: ISharedQuillInstance;
  private textContent: ContentChange;
  private pageLoaded = 0;
  private lastScrollTop = 0;

  public lastScrollStatus: EScrollSource | null = null;
  public isScrollToBottomBtnVisible = false;
  public typingUsername: string | null = null;
  public searchFC: FormControl = new FormControl('', [ Validators.maxLength(32) ]);

  constructor(
    private websocketService: WebsocketService,
    private chatService: ChatService,
    private store: Store<fromCore.State>
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(chatActions.getConverastionMessages({
      convId: this.chat.conversations.active,
      page: this.pageLoaded++,
      count: CHAT_MESSAGES_PER_PAGE
    }));

    this.searchFC.valueChanges.pipe(
      untilDestroyed(this),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((searchTerm: string) => {
      // TODO: Implement search
    });

    this.websocketService.receivedNewMessage().pipe(untilDestroyed(this)).subscribe((payload: IConversationMessage) => {
      if (this.chat.conversations.active === payload.chat) {
        this.store.dispatch(addNewMessage(payload));

        const $messagesWrapper = this.messagesWrapper.nativeElement;
        if ($messagesWrapper.clientHeight + $messagesWrapper.scrollTop === $messagesWrapper.scrollHeight) { // If scroll at the bottom
          this.expectChangesThanScroll();
        }
      }
    });

    this.websocketService.receivedTyping().pipe(untilDestroyed(this)).subscribe((payload: IWebsocketTyping) => {
      if (this.chat.conversations.active === payload.convId) {
        this.typingUsername = payload.username;
        setTimeout(() => {
          this.typingUsername = null;
        }, CHAT_TYPING_DURATION);
      }
    });
  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit(): void {
    /**
     * requestAnimationFrame fix the problem
     * when data is not exists after ngAfterViewInit called
     */
    requestAnimationFrame(() => {
      this.expectChangesThanScroll({ instantly: true });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.chat) {
      if (!changes.chat.firstChange && changes.chat.currentValue.conversations.active !== changes.chat.previousValue.conversations.active) {
        this.pageLoaded = 0;

        this.store.dispatch(chatActions.getConverastionMessages({
          convId: this.chat.conversations.active,
          page: this.pageLoaded++,
          count: CHAT_MESSAGES_PER_PAGE
        }));

        requestAnimationFrame(() => {
          this.expectChangesThanScroll({ instantly: true });
        });
      }
    }
  }

  getEditorInstance(quill: ISharedQuillInstance): void {
    this.textEditorInstance = quill;
  }

  textContentChange(value: ContentChange): void {
    this.textContent = value;
    this.websocketService.sendTyping({
      username: `${this.user.firstName} ${this.user.lastName}`,
      userId: this.user.id,
      convId: this.chat.conversations.active
    });
  }

  sendButtonClick(): void {
    if (this.textContent && this.textContent.html && this.chat.conversations.active) {
      this.websocketService.sendConversationMessage({
        convId: this.chat.conversations.active,
        userId: this.user.id,
        message: this.textContent.html
      }, (savedMessage) => {
        this.store.dispatch(addNewMessage(savedMessage));
        this.expectChangesThanScroll();
      });
      this.textEditorInstance.setContents([ { insert: '\n' } ]); // Clear editor input
    }
  }

  onHistoryScroll(evt: Event): void {
    const target: HTMLElement = evt.target as HTMLElement;

    if (this.lastScrollStatus === EScrollSource.USER) {
      if (target.scrollTop > this.lastScrollTop) { // Scroll DOWN
        this.isScrollToBottomBtnVisible = target.scrollTop < target.scrollHeight;
      } else { // Scroll UP
        this.isScrollToBottomBtnVisible = false;
      }
      this.lastScrollTop = target.scrollTop;
    }

    // Load new messages even when user use the scrollbar
    const totalMessages = this.getActiveConversationById(this.chat.conversations.active).messages.total;
    if (this.messagesWrapper?.nativeElement.scrollTop < CHAT_SCROLL_BUFFER &&
      this.chat.messages.data.length < totalMessages &&
      this.chat.messages.loading === false
    ) {
      this.loadMoreMessages();
    }

    if (target.clientHeight + target.scrollTop === target.scrollHeight) { // When scroll was reach a page's bottom
      this.isScrollToBottomBtnVisible = false;
    }
  }

  private loadMoreMessages(): void {
    let prevContainer = cloneDeep(this.messageContainers); // Copy of previous data

    // Load more messages
    this.store.dispatch(chatActions.getConverastionMessages({
      convId: this.chat.conversations.active,
      page: this.pageLoaded++,
      count: CHAT_MESSAGES_PER_PAGE
    }));

    // Wait for DOM updated, then update scroll position
    this.expectChanges(() => {
      this.messagesWrapper.nativeElement.scrollTop += prevContainer.first.nativeElement.offsetTop;
      prevContainer = null; // Free memory
      this.lastScrollStatus = EScrollSource.API;
    });
  }

  onWheelScroll(): void {
    this.lastScrollStatus = EScrollSource.USER;
  }

  onScrollBottomClick(): void {
    this.isScrollToBottomBtnVisible = false;
    this.expectChangesThanScroll({ force: true });
  }

  private expectChanges(callback: (list: QueryList<ElementRef>) => void): void {
    this.messageContainers.changes
      .pipe(first())
      .subscribe((data) => callback(data));
  }

  private expectChangesThanScroll(behavior?: IScrollBehavior): void {
    if (behavior?.force) {
      this.scrollToElement(this.messageContainers.last.nativeElement);
      this.lastScrollStatus = EScrollSource.API;
    } else {
      if (this.chat.conversations.active !== null) {
        this.expectChanges((list) => {
          (behavior && behavior.instantly) ?
            this.setScrollToBottom(this.messagesWrapper.nativeElement) :
            this.scrollToElement(list.last.nativeElement);

          this.lastScrollStatus = EScrollSource.API;
        });
      }
    }
  }

  getActiveConversation(chatId: string): IConversation {
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

  getConversationPartners(conv: IConversation): IConversationMember[] {
    return conv.participants.filter((participant) => participant.account.id !== this.user.id);
  }

  getConversationPartnerName(activeConv: string): string {
    const conv: IConversation = this.getActiveConversation(activeConv);
    const partner: IConversationMember = this.getConversationPartners(conv)[0];
    return `${partner.account.firstName} ${partner.account.lastName}`;
  }

  getActiveConversationById(convId: string): IConversation {
    return this.chat.conversations.data.filter((conv) => conv.id === convId)[0];
  }

  isConversationPartnerOnline(convId: string): boolean { // true - online, false - offline, null - not a private conversation
    const conv = this.getActiveConversationById(convId);
    const partners: IConversationMember[] = this.getConversationPartners(conv);

    return (conv.type === EConversationType.Private) ?
      new Date().getTime() - new Date(partners[0].account.lastSeen).getTime() < CHAT_ONLINE_DELTA_MS :
      null;
  }

  setScrollToBottom($container: HTMLElement): void {
    $container.scrollTop = $container.scrollHeight;
  }

  scrollToElement($element: HTMLElement): void {
    /**
     * setTimeout used even in official angular example
     * Check method "calculateSerializedPanes" in https://angular.io/api/core/ViewChildren#another-example
     */
    setTimeout(() => {
      $element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    });
  }
}
