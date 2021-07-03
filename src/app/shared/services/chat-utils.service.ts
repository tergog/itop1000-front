import { Injectable } from '@angular/core';

import { IConversationMember, IConversation } from 'app/shared/models';
import { EConversationType } from 'app/shared/enums';
import { CHAT_ONLINE_DELTA_MS } from 'app/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ChatUtilsService {
  public getConversationPartners(userId: string, conv: IConversation): IConversationMember[] {
    return conv.participants.filter((participant) => participant.account.id !== userId);
  }

  public getConversationPartnerName(userId: string, conv: IConversation): string {
    const partners: IConversationMember[] = this.getConversationPartners(userId, conv);
    return (conv.type === EConversationType.Private) ?
      `${partners[0].account.firstName} ${partners[0].account.lastName}` :
      `${partners.length} partners`;
  }

  public isConversationPartnerOnline(userId: string, conv: IConversation): boolean { // true - online, false - offline, null - not a private conversation
    const partners: IConversationMember[] = this.getConversationPartners(userId, conv);

    return (conv.type === EConversationType.Private) ?
      new Date().getTime() - new Date(partners[0].account.lastSeen).getTime() < CHAT_ONLINE_DELTA_MS :
      null;
  }
}
