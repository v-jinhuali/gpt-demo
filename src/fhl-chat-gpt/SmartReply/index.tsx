import { useCallback } from "react";
import styles from "./index.less";

interface ISmartReplyProps {
  data?: string[];
  onItemClick?: (value: string) => void;
}

const SmartReply: React.FC<ISmartReplyProps> = ({ data, onItemClick }) => {
  const handleItemClick = useCallback(
    (value: string) => {
      onItemClick?.(value);
    },
    [onItemClick]
  );
  return (
    <div className={styles.smartReplyContainer}>
      {data?.map(item => (
        <div className={styles.item} onClick={() => handleItemClick(item)}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default SmartReply;
