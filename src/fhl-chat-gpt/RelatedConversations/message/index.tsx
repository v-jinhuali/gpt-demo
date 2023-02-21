import { MessageInfoType } from "@/fhl-chat-gpt/index.interface";
import cn from "classnames";
import styles from "./index.less";

interface IMessageProps {
  messageInfo: MessageInfoType;
  isSelf: boolean;
}

const Message: React.FC<IMessageProps> = ({ messageInfo, isSelf }) => {
  return (
    <div className={cn(styles.messageContainer, isSelf && styles.selfContainer)}>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div className={styles.name}>{ <span >{messageInfo.name}</span>}</div>
          {messageInfo.message}
        </div>
      </div>
    </div>
  );
};

export default Message;
