import UserInfo from "./UserInfo";
import ChatBox from "./ChatBox";
import { DataType } from "../index.interface";

import styles from "./index.less";

interface IChatProps {
  data?: DataType;
  popSuggestionsData?: string[];
  onChange?: (newVal: DataType) => void;
  onSmartReplyClick?: () => void;
}

const Chat: React.FC<IChatProps> = ({
  data,
  popSuggestionsData,
  onChange,
  onSmartReplyClick
}) => {
  return (
    <div className={styles.chatContainer}>
      <UserInfo {...(data?.userMe ?? {})} />
      <ChatBox
        data={data}
        popSuggestionsData={popSuggestionsData}
        onChange={onChange}
        onSmartReplyClick={onSmartReplyClick}
      />
    </div>
  );
};

export default Chat;
