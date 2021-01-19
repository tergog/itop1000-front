import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { ENotificationStatus } from 'app/shared/enums/notification-status.enum';
import { ConversationModel } from 'app/shared/models/conversation.model';
import { ConversationMessageModel } from 'app/shared/models';
import { ChatService, NotificationsService, WebsocketService } from 'app/shared/services';
import * as actions from './chats.actions';
import * as fromCore from 'app/core/reducers';

@Injectable()
export class ChatEffects {
  constructor(
    private store: Store<fromCore.State>,
    private actions$: Actions,
    private chatService: ChatService,
    private websocketService: WebsocketService,
    private notificationService: NotificationsService
  ) {
  }

  getUserConversations$ = createEffect(() => this.actions$.pipe(
    ofType(actions.GET_CONVS_BY_USER_ID),
    switchMap(({ id, openWith }) => this.chatService.getConversationsByUserId(id).pipe(
      map((convs: ConversationModel[]) => actions.getConversationsByUserIdSuccess(convs)),
      tap(({ convs }) => {
        if (openWith) {
          const chatId = convs.filter((conv) => conv.participants.filter((part) => part.user.id === openWith).length)[0].id;
          this.store.dispatch(actions.setActiveConversation({ id: chatId }));
          this.websocketService.joinChat(id, chatId);
        }
      }),
      catchError((err: HttpErrorResponse) => {
        this.notificationService.message.emit({
          type: ENotificationStatus.Error,
          message: `[${err.status}] ${err.statusText}: ${err.error.message}`
        });
        return of(actions.getConversationsByUserIdError(err));
      })
    ))
  ));

  searchConversations$ = createEffect(() => this.actions$.pipe(
    ofType(actions.SEARCH_CONVS),
    switchMap(({ id, search }) => this.chatService.searchConversations(id, search).pipe(
      map((convs: ConversationModel[]) => actions.searchConversationsSuccess(convs)),
      catchError((err: HttpErrorResponse) => {
        this.notificationService.message.emit({
          type: ENotificationStatus.Error,
          message: `[${err.status}] ${err.statusText}: ${err.error.message}`
        });
        return of(actions.searchConversationsError(err));
      })
    ))
  ));

  setActiveConversation$ = createEffect(() => this.actions$.pipe(
    ofType(actions.SET_ACTIVE_CONV),
    switchMap(({ id, count }) => this.chatService.getMessagesByConversationId(id, count).pipe(
      map((messages: ConversationMessageModel[]) => actions.getConverastionMessagesSuccess(messages)),
      catchError((err: HttpErrorResponse) => {
        this.notificationService.message.emit({
          type: ENotificationStatus.Error,
          message: `[${err.status}] ${err.statusText}: ${err.error.message}`
        });
        return of(actions.getConverastionMessageError(err));
      })
    ))
  ));
}
