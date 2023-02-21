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
  checked?: boolean;
}

export interface ConversationInfoType {
  messages: MessageInfoType[];
  checked: boolean;
}

export interface DataType {
  userTarget?: UserInfoType;
  userMe?: UserInfoType;
  relatedConversations?: ConversationInfoType[];
  recentConversations?: [MessageInfoType[]?];
  mode?: Mode;
  receivedMessage?: string;
  currentTime?: string;
}

export interface ChatGptResponseType {
  intent?: string;
  message?: string;
}

export enum Mode {
  Starter,
  Reply
}
export enum UserType{
  Me,
  Target
}