import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiConstants } from 'app/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public createNewConversation(creator_id: string, with_id: string): Observable<object> {
    return this.http.post(`${this.apiURL}${ApiConstants.chat.create}`, {
      creator_id,
      with_id
    });
  }

  public getConversationsByUserId(userId: string): Observable<object> {
    return this.http.get(`${this.apiURL}${ApiConstants.chat.getConversationsByMemberId}/${userId}`,{});
  }

  public searchConversations(userId: string, search: string): Observable<object> {
    return this.http.get(`${this.apiURL}${ApiConstants.chat.search}/${userId}/${search}`, {});
  }

  // Messages
  public getMessagesByConversationId(convId: string, page: number, count: number): Observable<object> {
    return this.http.get(`${this.apiURL}${ApiConstants.chat.getMessagesById}/${convId}/${page}/${count}`, {});
  }
}
