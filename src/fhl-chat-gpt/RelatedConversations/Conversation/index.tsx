import Message from "@/fhl-chat-gpt/RelatedConversations/message";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React, { useCallback, useMemo } from "react";
import { ConversationInfoType, DataType } from "../../index.interface";
import styles from "./index.less";

interface IConversationProps {
  data?: DataType;
  conversation: ConversationInfoType;
  id: number;
  onChange?: (newValue: ConversationInfoType, id: number) => void;
}

const Conversation: React.FC<IConversationProps> = ({ data, conversation, id, onChange }) => {
  const myName = data?.userMe?.name ?? "";

  const handleChange = useCallback(
    (e: CheckboxChangeEvent) => {
      var copyData = { ...conversation };
      copyData.checked = e.target.checked;
      onChange?.(copyData, id);
    },
    [conversation]
  );

  return (
    <div className={styles.conversationContainer}>
      <Checkbox checked={conversation.checked} onChange={handleChange}></Checkbox>
      {conversation.messages?.map((item, index) => (
        <Message
          key={index + "-" + item.name}
          isSelf={myName === item.name}
          messageInfo={item}
        ></Message>
      ))}
    </div>
  );
};

export default Conversation;
