import { useCallback, useEffect, useMemo, useRef } from "react";
import { EditableText } from "@/components";
import { DataType, MessageInfoType } from "../index.interface";

import styles from "./index.less";

interface IRecentConversations {
  username: string;
  data?: DataType;
  onChange?: (newVal: DataType) => void;
}

const RecemtConverstaions: React.FC<IRecentConversations> = ({ username, data, onChange }) => {
  const container = useRef<HTMLDivElement>(null);

  const myRecentMessages = useMemo(
    () =>
      (data?.recentConversations?.[0] ?? []).reduce((pre, cur, index) => {
        if (cur.name !== username) {
          return pre;
        }

        return [...pre, { index, message: cur.message ?? "" }];
      }, [] as { index: number; message: string }[]),
    [username, data]
  );

  const handleEditableEnter = useCallback(
    (value: string, id: number | string) => {
      const dataCopy = { ...data };
      const curMessage = dataCopy.recentConversations?.[0]?.[id as number];

      if (curMessage?.name === username) {
        curMessage.message = value;
        onChange?.(dataCopy);
      }
    },
    [username, data, onChange]
  );

  useEffect(() => {
    if (!container.current) {
      return;
    }

    container.current.scrollTo({ top: container.current.scrollHeight });
  }, [data]);

  return (
    <div className={styles.messageContainer} ref={container}>
      {myRecentMessages.map(item => (
        <EditableText
          key={`${item.message}-${item.index}`}
          className={styles.editableText}
          id={item.index}
          value={item.message}
          onChange={handleEditableEnter}
        />
      ))}
    </div>
  );
};

export default RecemtConverstaions;
