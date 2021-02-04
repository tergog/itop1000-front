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

  constructor(private http: HttpClient) {
  }

  // Conversations
  public createNewConversation(creatorId: string, withId: string): Observable<ConversationModel> {
    return this.http.post<ConversationModel>(`${this.apiURL}${ApiConstants.chat.createConversation}`, {
      creatorId,
      withId
    });
  }

  public getConversationsByUserId(userId: string, searchTerm?: string): Observable<ConversationModel[]> {
    let query = `${this.apiURL}${ApiConstants.chat.getConversationsByMemberId}/${userId}`;

    if (typeof searchTerm !== 'undefined') {
      query += `?searchTerm=${searchTerm}`;
    }

    return this.http.get<ConversationModel[]>(query, {});
  }

  // Messages
  public getMessagesByConversationId(convId: string, page: number, count: number, searchTerm?: string): Observable<ConversationMessageModel[]> {
    let query = `${this.apiURL}${ApiConstants.chat.getMessagesByConversationId}/${convId}?page=${page}&count=${count}`;

    if (typeof searchTerm !== 'undefined') {
      query += `&searchTerm=${searchTerm}`;
    }

    return this.http.get<ConversationMessageModel[]>(query, {});
  }
}
