export interface WebsocketTypingModel {
  username: string;
  userId: string;
  chatId: string;
}

export interface WebsocketOnlineModel {
  userId: string;
  lastSeen: string;
}
