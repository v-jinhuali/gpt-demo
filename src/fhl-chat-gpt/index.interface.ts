export interface UserInfoType {
  name?: string;
  status?: string;
  calendar?: MeetingInfoType[];
}

export interface MessageInfoType {
  name?: string;
  message?: string;
}

export interface MeetingInfoType {
  title?: string;
  startTime?: string;
  endTime?: string;
}

export interface DataType {
  userTarget?: UserInfoType;
  userMe?: UserInfoType;
  relatedConversations?: MessageInfoType[][];
  recentConversations?: [MessageInfoType[]?];
  mode?: Mode;
  receivedMessage?: string;
}

export interface ChatGptResponseType {
  intent?: string;
  message?: string;
}

export enum Mode {
  Starter,
  Reply
}
