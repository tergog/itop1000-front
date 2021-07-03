import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

import { environment } from 'environments/environment';
import { WSCONST } from 'app/constants/websocket.constants';
import { IConversationMessage, IWebsocketException, IWebsocketOnline, IWebsocketSendMessage, IWebsocketTyping } from 'app/shared/models';
import * as fromCore from 'app/core/reducers';
import * as coreActions from 'app/core/actions/core.actions';


/**
 * Class representing a socket service for chat.
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private readonly socket = io(`${environment.wsUrl}/chat`, {
    transports: [ 'websocket' ]
  });

  constructor(
    private store: Store<fromCore.State>
  ) {
  }

  /**
   * Sends a knowledge of user goes online
   */
  private sendOnline(userId: string): void {
    const lastSeen = new Date().toISOString();
    this.socket.emit(WSCONST.SEND.ONLINE, { userId, lastSeen });
    this.store.dispatch(new coreActions.UpdateUserLastSeen(userId, lastSeen));
  }

  /**
   * Sends a knowledge of user does join the conversation
   */
  sendJoinChat(userId: string, chatId: string): void {
    this.socket.emit(WSCONST.SEND.JOIN, { chatId, userId });
    this.sendOnline(userId);
  }

  /**
   * Sends a knowledge of user is typing
   */
  sendTyping(data: IWebsocketTyping): void {
    this.socket.emit(WSCONST.SEND.TYPING, data);
    this.sendOnline(data.userId);
  }

  /**
   * Sends a new message to specified conversation. Calls a **savedMessageCb** callback when success
   */
  sendConversationMessage(message: IWebsocketSendMessage, savedMessageCb: (message: IConversationMessage) => void): void {
    this.socket.emit(WSCONST.SEND.MESSAGE, message, (response: IConversationMessage) => {
      savedMessageCb(response);
    });
    this.sendOnline(message.userId);
  }

  /**
   * Emits when a message from another user received. **message** argument represent a **IConversationMessage**
   *
   * @example
   * receivedNewMessage.subscribe((message) => {
   *  doSomething();
   * });
   */
  receivedNewMessage(): Observable<IConversationMessage> {
    return new Observable<IConversationMessage>((observer) => {
      this.socket.on(WSCONST.ON.MESSAGE, (data: IConversationMessage): void => {
        observer.next(data);
      });
      return () => this.socket.disconnect();
    });
  }

  /**
   * Emits when another user is typing. **payload.username** contains concatenation of the first and last names of the user.
   *
   * @example
   * receivedTyping.subscribe((payload) => {
   *  payload.username
   *  payload.userId
   *  payload.chatId
   * });
   */
  receivedTyping(): Observable<IWebsocketTyping> {
    return new Observable<IWebsocketTyping>((observer) => {
      this.socket.on(WSCONST.ON.TYPING, (data: IWebsocketTyping): void => {
        observer.next(data);
      });
      return () => this.socket.disconnect();
    });
  }

  /**
   * Emits when another user goes online.
   * The user is considered online if less than five seconds have passed since **payload.lastSeen**.
   *
   * @example
   * receivedOnline.subscribe((payload) => {
   *   payload.userId
   *   payload.lastSeen
   * });
   */
  receivedOnline(): Observable<IWebsocketOnline> {
    return new Observable<IWebsocketOnline>((observer) => {
      this.socket.on(WSCONST.ON.ONLINE, (data): void => {
        observer.next(data);
      });
      return () => this.socket.disconnect();
    });
  }

  /**
   * Emits when exception received.
   *
   * @example
   * receivedError.subscribe((exception) => {
   *   doSomething();
   * });
   */
  receivedError(): Observable<IWebsocketException> {
    return new Observable<IWebsocketException>((observer) => {
      this.socket.on(WSCONST.ON.EXCEPTION, (err): void => {
        observer.next(err);
      });
      return () => this.socket.disconnect();
    });
  }
}
