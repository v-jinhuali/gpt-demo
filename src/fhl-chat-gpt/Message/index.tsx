import EditableText from "@/components/EditableText";
import cn from "classnames";
import { useCallback } from "react";
import { MessageInfoType } from "../index.interface";
import styles from "./index.less";

interface IMessageProps {
  id: number;
  myName: string;
  item: MessageInfoType;
  onChange?: (newVal: MessageInfoType, id: number) => void;
}

const Message: React.FC<IMessageProps> = ({ id, myName, item, onChange }) => {
  const isSelf = myName === item.name;

  const handleEditableEnter = useCallback(
    (value: string, id: number | string) => {
      if (value) {
        item.message = value;
        onChange?.(item, id as number);
      }
    },
    [item]
  );

  return (
    <div className={cn(styles.messageContainer, isSelf && styles.selfContainer)}>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div className={styles.name}>{<span>{item.name}</span>}</div>
          <div>{item.message ?? ""}</div>
          {/* <EditableText
            className={cn(styles.editableText, styles.text)}
            id={id}
            value={item.message ?? ""}
            onChange={handleEditableEnter}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Message;
