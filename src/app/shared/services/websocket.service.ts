import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { ConversationMessageModel, UserInfo } from 'app/shared/models';

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

  constructor() {
  }

  joinChat(user: UserInfo, chatId: string): void {
    this.socket.emit('join', { user, chatId });
  }

  typing(data: any): void {
    this.socket.emit('typing', data);
  }

  beingOnline(data: any): void {
    this.socket.emit('being online', data);
  }

  sendConversationMessage(message: SendConversationMessageModel, savedMessageCb: Function = (message: ConversationMessageModel): void => {}): void {
    this.socket.emit('message', message, (response: ConversationMessageModel) => {
      savedMessageCb(response);
    });
  }

  receivedNewMessage() {
    return new Observable<ConversationMessageModel>((observer) => {
      this.socket.on('message', (data: ConversationMessageModel): void => {
        observer.next(data);
      });
      return () => this.socket.disconnect();
    });
  }

  receivedTyping() {
    return new Observable<{ chat: string, username: string }>((observer) => {
      this.socket.on('typing', (data: any): void => {
        observer.next(data);
      })
      return () => this.socket.disconnect();
    });
  }

  receivedBeingOnline() {
    return new Observable<{ userId: string }>((observer) => {
      this.socket.on('being online', (data: any): void => {
        observer.next(data);
      })
      return () => this.socket.disconnect();
    });
  }
}
