import { useCallback, useMemo } from "react";
import { ConversationInfoType, DataType } from "../index.interface";
import Conversation from "./Conversation";
import styles from "./index.less";
import { Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";

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

  const handleConversationChange = useCallback(
    (newValue: ConversationInfoType, id: number) => {
      const dataCopy = { ...data };

      if (!dataCopy.relatedConversations) {
        dataCopy.relatedConversations = [];
      }

      dataCopy.relatedConversations[id] = newValue;
      onChange?.(dataCopy);
    },
    [data]
  );

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
            onChange={handleConversationChange}
          ></Conversation>
        ))}
      </div>
    </>
  );
};

export default RelatedConversations;
