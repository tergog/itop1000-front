import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiConstants } from 'app/constants/api.constants';
import { IConversationMessage, IConversation } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  // Conversations
  public createNewConversation(creatorId: string, withId: string): Observable<IConversation> {
    return this.http.post<IConversation>(`${this.apiURL}${ApiConstants.chat.createConversation}`, {
      creatorId,
      partnerId: withId
    });
  }

  public getConversationsByUserId(userId: string, searchTerm?: string): Observable<IConversation[]> {
    let query = `${this.apiURL}${ApiConstants.chat.getConversationsByMemberId}/${userId}`;

    if (typeof searchTerm !== 'undefined') {
      query += `?searchTerm=${searchTerm}`;
    }

    return this.http.get<IConversation[]>(query, {});
  }

  // Messages
  public getMessagesByConversationId(convId: string, page: number, count: number, searchTerm?: string): Observable<IConversationMessage[]> {
    let query = `${this.apiURL}${ApiConstants.chat.getMessagesByConversationId}/${convId}?page=${page}&count=${count}`;

    if (typeof searchTerm !== 'undefined') {
      query += `&searchTerm=${searchTerm}`;
    }

    return this.http.get<IConversationMessage[]>(query, {});
  }
}
