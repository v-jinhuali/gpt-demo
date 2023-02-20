import { KeyboardEventHandler, useCallback, useEffect, useRef, useState } from "react";
import { Button, Input, InputRef } from "antd";
import styles from "./index.less";
import Message from "../Message";
import UserInfo from "../UserInfo";
import SmartReply from "../SmartReply";

import "antd/dist/antd.css";
import { SendOutlined } from "@ant-design/icons";
import { ChatGptResponseType, DataType, Mode } from "../index.interface";

interface IChatBoxProps {
  data?: DataType;
  popSuggestionsData?: ChatGptResponseType[];
  onChange?: (newVal: DataType) => void;
  onSmartReplyClick?: (value: ChatGptResponseType) => void;
}

const ChatBox: React.FC<IChatBoxProps> = ({
  data,
  popSuggestionsData,
  onChange,
  onSmartReplyClick
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);

  const myName = data?.userMe?.name ?? "";
  const messages = [...(data?.recentConversations?.[0] ?? [])];

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value),
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
  }, [data, inputValue, myName]);

  const handleSmartClick = useCallback(
    (value: ChatGptResponseType) => {
      setInputValue(value.message ?? "");
    },
    [data, onChange, onSmartReplyClick]
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
        {messages.map((item, index) => (
          <Message key={index} isSelf={item.name === myName} message={item.message ?? ""} />
        ))}
      </div>
      <div className={styles.inputWrapper}>
        <div className={styles.inputBox}>
          <Input value={inputValue} onChange={handleInputChange} onPressEnter={handleInputEnter} />
          <Button type="primary" icon={<SendOutlined />} onClick={handleInputEnter}></Button>
        </div>
        {!!popSuggestionsData?.length && (
          <div className={styles.smartReplyBox}>
            <SmartReply data={popSuggestionsData} onItemClick={handleSmartClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
