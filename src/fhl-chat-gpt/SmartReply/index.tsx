import { useCallback } from "react";
import { ChatGptResponseType } from "../index.interface";
import styles from "./index.less";

interface ISmartReplyProps {
  data?: ChatGptResponseType[];
  onItemClick?: (value: ChatGptResponseType) => void;
}

const SmartReply: React.FC<ISmartReplyProps> = ({ data, onItemClick }) => {
  const handleItemClick = useCallback(
    (value: ChatGptResponseType) => {
      onItemClick?.(value);
    },
    [onItemClick]
  );
  return (
    <div className={styles.smartReplyContainer}>
      {data?.map(item => (
        <div key={item.intent} className={styles.item} onClick={() => handleItemClick(item)}>
          {item.intent}
        </div>
      ))}
    </div>
  );
};

export default SmartReply;
