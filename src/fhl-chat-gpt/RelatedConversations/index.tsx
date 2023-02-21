import { useCallback, useEffect, useMemo, useState } from "react";
import { ConversationInfoType, DataType, MeetingInfoType } from "../index.interface";

import styles from "./index.less";
import { Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Conversation from "./Conversation";

interface IRelatedConversations {
  data?: DataType;
  onChange?: (newVal: DataType) => void;
}

const RelatedConversations: React.FC<IRelatedConversations> = ({ data, onChange }) => {
  const conversations = useMemo(
    () => data?.relatedConversations?.map((item, index) => ({ ...item, index })) ?? [],
    [data]
  );

  const addConversation = useCallback(() => {}, [onChange]);

  const handleConversationOnChange = (newValue: ConversationInfoType, id: number) => {
    const dataCopy = { ...data };

    if (!dataCopy.relatedConversations) {
      dataCopy.relatedConversations = [];
    }

    dataCopy.relatedConversations[id] = newValue;

    onChange?.(dataCopy);
  };

  return (
    <>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Related Conversations</h2>
        <Tooltip title="Add a conversation">
          {/* <Button type="primary" icon={<PlusOutlined />} onClick={addConversation} /> */}
        </Tooltip>
      </div>
      <div className={styles.container}>
        {conversations.map(conversation => (
          <Conversation
            key={conversation.index}
            data={data}
            conversation={conversation}
            id={conversation.index}
            onChange={handleConversationOnChange}
          ></Conversation>
        ))}
      </div>
    </>
  );
};

export default RelatedConversations;
