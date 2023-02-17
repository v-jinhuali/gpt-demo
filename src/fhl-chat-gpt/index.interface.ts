export interface UserInfoType {
  name?: string;
  status?: string;
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
  meetings?: MeetingInfoType[];
  relatedConversations?: MessageInfoType[][];
  recentConversations?: [MessageInfoType[]?];
}

export interface ChatGptResponseType {
  message?: MessageInfoType;
  smartReply?: string[];
}
