import { FC, useCallback } from "react";
import styles from "./index.less";

interface ISmartReplyProps {
  data?: string[];
  onItemClick?: (value: string) => void;
}

const SmartReply: FC<ISmartReplyProps> = ({ data, onItemClick }) => {
  const handleItemClick = useCallback(
    (value: string) => {
      onItemClick?.(value);
    },
    [onItemClick]
  );
  return (
    <div className={styles.smartReplyContainer}>
      {data?.map((item, index) => (
        <div key={`${item}-${index}`} className={styles.item} onClick={() => handleItemClick(item)}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default SmartReply;
