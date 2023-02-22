import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Input, InputRef } from "antd";
import styles from "./index.less";
import Message from "../Message";
import UserInfo from "../UserInfo";
import SmartReply from "../SmartReply";

import "antd/dist/antd.css";
import { SendOutlined } from "@ant-design/icons";
import { ChatGptResponseType, DataType, MessageInfoType, Mode, UserType } from "../index.interface";
const { TextArea } = Input;

interface IChatBoxProps {
  busy?: Boolean;
  data?: DataType;
  popSuggestionsData?: ChatGptResponseType[];
  onChange?: (newVal: DataType) => void;
  onSmartReplyClick?: (value: ChatGptResponseType) => void;
  onStatusChange?: (status: string, userType: UserType) => void;
}

const ChatBox: React.FC<IChatBoxProps> = ({
  busy,
  data,
  popSuggestionsData,
  onChange,
  onSmartReplyClick,
  onStatusChange
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);

  const myName = data?.userMe?.name ?? "";
  const messages = [...(data?.recentConversations?.[0] ?? [])];

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setInputValue(e.target.value),
    []
  );

  useEffect(() => {
    setInputValue("");
  }, [data?.mode]);

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

  const handleEditedMessageFromTarget = useCallback(
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
  const handleStatusChange = useCallback(
    (status: string, userType: UserType) => {
      if (!status) {
        return;
      }
      onStatusChange?.(status, userType);
    },
    [onStatusChange]
  );

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
        <UserInfo
          busy={!!busy}
          userType={UserType.Target}
          {...data?.userTarget}
          onChange={handleStatusChange}
          onGet={() => {}}
        />
      </div>
      <div ref={contentRef} className={styles.content}>
        {messages.map((item, index) => (
          // <Message key={index} isSelf={item.name === myName} message={item.message ?? ""} />
          <Message
            key={index}
            id={index}
            myName={myName}
            item={item}
            onChange={handleEditedMessageFromTarget}
          ></Message>
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
