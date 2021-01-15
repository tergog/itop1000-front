import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect} from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { ConversationModel } from 'app/shared/models/conversation.model';
import { ConversationMessageModel } from 'app/shared/models';
import { ChatService, NotificationsService } from 'app/shared/services';
import * as actions from './chats.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { ENotificationStatus } from 'app/shared/enums/notification-status.enum';

@Injectable()
export class ChatEffects {
  constructor(
    private actions$: Actions,
    private chatService: ChatService,
    private notificationService: NotificationsService
  ) { }

  getUserConversations$ = createEffect(() => this.actions$.pipe(
    ofType(actions.GET_CONVS_BY_USER_ID),
    switchMap(({ id, cancelSearch }) => this.chatService.getConversationsByUserId(id).pipe(
      map((convs: ConversationModel[]) => actions.getConversationsByUserIdSuccess(convs)),
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
        return of(actions.searchConversationsError(err))
      })
    ))
  ));

  setActiveConversation$ = createEffect(() => this.actions$.pipe(
    ofType(actions.SET_ACTIVE_CONV),
    switchMap(({ id, count }) => this.chatService.getMessagesByConversationId(id, count).pipe(
      map((messages: ConversationMessageModel[]) => actions.getConverastionMessagesSuccess(messages)),
      tap(() => actions.setActiveConversation(id)),
      catchError((err: HttpErrorResponse) => {
        this.notificationService.message.emit({
          type: ENotificationStatus.Error,
          message: `[${err.status}] ${err.statusText}: ${err.error.message}`
        });
        return of(actions.getConverastionMessageError(err))
      })
    ))
  ));
}
