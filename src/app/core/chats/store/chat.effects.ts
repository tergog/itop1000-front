import { Injectable, isDevMode } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { ENotificationStatus } from 'app/shared/enums/notification-status.enum';
import { IConversation } from 'app/shared/models/conversation.model';
import { IConversationMessage } from 'app/shared/models';
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

  private emitErrorNotification(data: HttpErrorResponse) {
    if (isDevMode) {
      console.error('[Chat effects]:', data);
    }

    this.notificationService.message.emit({
      type: ENotificationStatus.Error,
      message: `[${data.status || 'Unknown status'}] ${data.statusText || 'Unknown error'}: ${data.error?.message || 'Unknown'}`
    });
  }

  searchConversations$ = createEffect(() => this.actions$.pipe(
    ofType(actions.searchConversations),
    switchMap(({ userId, term }) => this.chatService.getConversationsByUserId(userId, term).pipe(
      map((convs: IConversation[]) => actions.searchConversationsSuccess(convs)),
      catchError((err: HttpErrorResponse) => {
        this.emitErrorNotification(err);
        return of(actions.searchConversationsError(err));
      })
    ))
  ));

  getConversationMessages$ = createEffect(() => this.actions$.pipe(
    ofType(actions.getConverastionMessages),
    switchMap(({ convId, page, count }) => this.chatService.getMessagesByConversationId(convId, page, count).pipe(
      map((messages: IConversationMessage[]) => actions.getConverastionMessagesSuccess(messages)),
      catchError((err: HttpErrorResponse) => {
        this.emitErrorNotification(err);
        return of(actions.getConverastionMessageError(err));
      })
    ))
  ));
}
