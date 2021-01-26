import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiConstants } from 'app/constants/api.constants';
import { ConversationMessageModel, ConversationModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public createNewConversation(creatorId: string, withId: string): Observable<ConversationModel> {
    return this.http.post<ConversationModel>(`${this.apiURL}${ApiConstants.chat.create}`, {
      creatorId,
      withId
    });
  }

  public getConversationsByUserId(userId: string): Observable<ConversationModel[]> {
    return this.http.get<ConversationModel[]>(`${this.apiURL}${ApiConstants.chat.getConversationsByMemberId}/${userId}`,{});
  }

  public searchConversations(userId: string, search: string): Observable<ConversationModel[]> {
    return this.http.get<ConversationModel[]>(`${this.apiURL}${ApiConstants.chat.search}/${userId}/${search}`, {});
  }

  // Messages
  public getMessagesByConversationId(convId: string, page: number, count: number): Observable<ConversationMessageModel[]> {
    return this.http.get<ConversationMessageModel[]>(`${this.apiURL}${ApiConstants.chat.getMessagesById}/${convId}/${page}/${count}`, {});
  }
}
