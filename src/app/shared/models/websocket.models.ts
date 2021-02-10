export interface IWebsocketTyping {
  username: string;
  userId: string;
  convId: string;
}

export interface IWebsocketOnline {
  userId: string;
  lastSeen: string;
}

export interface IWebsocketSendMessage {
  convId: string;
  userId: string;
  message: string;
}

export interface IWebsocketException {
  timestamp: string; // ISO Date
  data: any;
  exception: string;
}
