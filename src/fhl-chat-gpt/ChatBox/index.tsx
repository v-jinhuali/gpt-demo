import { KeyboardEventHandler, useCallback, useEffect, useRef, useState } from "react";
import { Button, Input, InputRef } from "antd";
import styles from "./index.less";
import Message from "../Message";
import UserInfo from "../UserInfo";
import SmartReply from "../SmartReply";

import "antd/dist/antd.css";
import { SendOutlined } from "@ant-design/icons";
import { ChatGptResponseType, DataType, MessageInfoType, Mode } from "../index.interface";
import NewMessage from "../NewMessage";
import NewUserInfo from "../NewUserInfo";
const { TextArea } = Input;

interface IChatBoxProps {
  data?: DataType;
  popSuggestionsData?: ChatGptResponseType[];
  onChange?: (newVal: DataType) => void;
  onSmartReplyClick?: (value: ChatGptResponseType) => void;
  onUpdateStatus?: (newVal: string, id: string) => void;
}

const ChatBox: React.FC<IChatBoxProps> = ({
  data,
  popSuggestionsData,
  onChange,
  onSmartReplyClick,
  onUpdateStatus
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);

  const myName = data?.userMe?.name ?? "";
  const messages = [...(data?.recentConversations?.[0] ?? [])];

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setInputValue(e.target.value),
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

  const handleEditedMessageFromOther = useCallback(
    (item: MessageInfoType, index: number) => {
      if (!item.message) {
        return;
      }
      setInputValue("");
      const dataCopy = { ...data };
      // (dataCopy.recentConversations?.[0] ?? [])[index] = item;
      dataCopy.receivedMessage = item.message;
      onChange?.(dataCopy);
    },
    [data]
  );
  const updateStatus = (newVal: string, id: string | number) => {
    if (!newVal) {
      return;
    }
    onUpdateStatus?.(newVal, "target");
  };

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
        <NewUserInfo {...data?.userTarget} onChange={updateStatus} />
      </div>
      <div ref={contentRef} className={styles.content}>
        {messages.map((item, index) => (
          // <Message key={index} isSelf={item.name === myName} message={item.message ?? ""} />
          <NewMessage
            key={index}
            id={index}
            myName={myName}
            item={item}
            onChange={handleEditedMessageFromOther}
          ></NewMessage>
        ))}
      </div>
      <div className={styles.inputWrapper}>
        <div className={styles.inputBox}>
          <TextArea
            rows={1}
            value={inputValue}
            onChange={handleInputChange}
            onPressEnter={handleInputEnter}
          />
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
