import { Injectable } from '@angular/core';

import { ConversationMemberModel, ConversationModel } from 'app/shared/models';
import { EConversationTypeEnum } from 'app/shared/enums';
import { CHAT_ONLINE_DELTA_MS } from 'app/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ChatUtilsService {
  public getConversationPartners(userId: string, conv: ConversationModel): ConversationMemberModel[] {
    return conv.participants.filter((participant) => participant.user.id !== userId);
  }

  public getConversationPartnerName(userId: string, conv: ConversationModel): string {
    const partners: ConversationMemberModel[] = this.getConversationPartners(userId, conv);
    return (conv.type === EConversationTypeEnum.Private) ?
      `${partners[0].user.firstName} ${partners[0].user.lastName}` :
      `${partners.length} partners`;
  }

  public isConversationPartnerOnline(userId: string, conv: ConversationModel): boolean { // true - online, false - offline, null - not a private conversation
    const partners: ConversationMemberModel[] = this.getConversationPartners(userId, conv);

    return (conv.type === EConversationTypeEnum.Private) ?
      new Date().getTime() - new Date(partners[0].user.lastSeen).getTime() < CHAT_ONLINE_DELTA_MS :
      null;
  }
}
