import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from "react";
import { Input } from "antd";
import styles from "./index.less";
import Message from "../Message";
import UserInfo from "../UserInfo";
import SmartReply from "../SmartReply";
import { DataType } from "../../index.interface";

import "antd/dist/antd.css";

interface IChatBoxProps {
  data?: DataType;
  popSuggestionsData?: string[];
  onChange?: (newVal: DataType) => void;
  onSmartReplyClick?: () => void;
}

const ChatBox: FC<IChatBoxProps> = ({ data, popSuggestionsData, onChange, onSmartReplyClick }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);

  const myName = data?.userMe?.name ?? "";
  const messages = [...(data?.recentConversations?.[0] ?? [])];

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value),
    []
  );

  const handleInputEnter = useCallback(() => {
    if (!inputValue) {
      return;
    }

    setInputValue("");

    const dataCopy = { ...data };
    dataCopy.recentConversations = [
      [...(dataCopy.recentConversations?.[0] ?? []), { name: myName, message: inputValue }]
    ];
    onChange?.(dataCopy);
  }, [data, inputValue, myName, onChange]);

  const handleSmartClick = useCallback(
    (value: string) => {
      const dataCopy = { ...data };
      dataCopy.recentConversations = [
        [...(dataCopy.recentConversations?.[0] ?? []), { name: myName, message: value }]
      ];
      onChange?.(dataCopy);
      onSmartReplyClick?.();
    },
    [data, myName, onChange, onSmartReplyClick]
  );

  useEffect(() => {
    if (!contentRef.current) {
      return;
    }

    contentRef.current.scrollTo({ top: contentRef.current.scrollHeight });
  }, [data]);

  return (
    <div className={styles.chatBoxContainer}>
      <div className={styles.header}>
        <UserInfo {...data?.userTarget} />
      </div>
      <div ref={contentRef} className={styles.content}>
        {messages.map(item => (
          <Message
            key={`${item.message}`}
            isSelf={item.name === myName}
            message={item.message ?? ""}
          />
        ))}
      </div>
      <div className={styles.inputWrapper}>
        <div className={styles.inputBox}>
          {!!popSuggestionsData?.length && (
            <div className={styles.smartReplyBox}>
              <SmartReply data={popSuggestionsData} onItemClick={handleSmartClick} />
            </div>
          )}
          <Input value={inputValue} onChange={handleInputChange} onPressEnter={handleInputEnter} />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
