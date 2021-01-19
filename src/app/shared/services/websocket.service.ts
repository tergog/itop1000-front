import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

import { environment } from 'environments/environment';
import { ConversationMessageModel, WebsocketOnlineModel, WebsocketTypingModel } from 'app/shared/models';
import { WSCONST } from 'app/constants/websocket.constants';
import * as fromCore from 'app/core/reducers';
import * as coreActions from 'app/core/actions/core.actions';

interface SendConversationMessageModel {
  chat: string;
  sender: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket = io(environment.apiUrl);

  constructor(
    private store: Store<fromCore.State>
  ) {
  }

  online(userId: string): void {
    const lastSeen = new Date().toISOString();
    this.socket.emit(WSCONST.SEND.ONLINE, { userId, lastSeen });
    this.store.dispatch(new coreActions.UpdateUserLastSeen(userId, lastSeen));
  }

  joinChat(userId: string, chatId: string): void {
    this.socket.emit(WSCONST.SEND.JOIN, { chatId, userId });
    this.online(userId);
  }

  typing(data: WebsocketTypingModel): void {
    this.socket.emit(WSCONST.SEND.TYPING, data);
    this.online(data.userId);
  }

  sendConversationMessage(message: SendConversationMessageModel, savedMessageCb: Function = (message: ConversationMessageModel): void => {}): void {
    this.socket.emit(WSCONST.SEND.MESSAGE, message, (response: ConversationMessageModel) => {
      savedMessageCb(response);
    });
    this.online(message.sender);
  }

  receivedNewMessage() {
    return new Observable<ConversationMessageModel>((observer) => {
      this.socket.on(WSCONST.ON.MESSAGE, (data: ConversationMessageModel): void => {
        observer.next(data);
      });
      return () => this.socket.disconnect();
    });
  }

  receivedTyping() {
    return new Observable<WebsocketTypingModel>((observer) => {
      this.socket.on(WSCONST.ON.TYPING, (data: WebsocketTypingModel): void => {
        observer.next(data);
      })
      return () => this.socket.disconnect();
    });
  }

  receivedOnline() {
    return new Observable<WebsocketOnlineModel>((observer) => {
      this.socket.on(WSCONST.ON.ONLINE, (data: WebsocketOnlineModel): void => {
        observer.next(data);
      })
      return () => this.socket.disconnect();
    });
  }
}
