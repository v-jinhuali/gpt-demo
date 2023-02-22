import { FC } from "react";
import cn from "classnames";
import styles from "./index.less";

interface IMessageProps {
  isSelf?: boolean;
  message: string;
}

const Message: FC<IMessageProps> = ({ isSelf, message }) => {
  return (
    <div className={cn(styles.messageContainer, isSelf && styles.selfContainer)}>
      <div className={styles.contentWrapper}>
        {!isSelf && <div className={styles.avatar} />}
        <div className={styles.content}>{message}</div>
      </div>
    </div>
  );
};

export default Message;
