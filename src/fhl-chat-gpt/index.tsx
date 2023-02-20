import { useCallback, useEffect, useMemo, useState } from "react";
import { message } from "antd";
import ChatBox from "./ChatBox";
import UserInfo from "./UserInfo";
import RecentConverstaions from "./RecentConversations";
import CalendarInfo from "./CalerdarInfo";
import ModeSwitcher from "./ModeSwitcher";
import { postData } from "@/services";
import { mockedInfo } from "../mocked-data";
import { ChatGptResponseType, DataType } from "./index.interface";

import styles from "./index.less";

const FhlChatGpt: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<DataType>({});
  const [popSuggestionsData, setPopSuggestionsData] = useState<ChatGptResponseType[]>([]);

  const username = useMemo(() => data.userMe?.name, [data]);

  const getResponseFromChatGpt = useCallback(async (newData: DataType) => {
    try {
      const res = await postData("http://10.172.44.71:12345/smartreply", mockedInfo);

      const resData = res.data as ChatGptResponseType[];

      if (!!resData?.length) {
        setTimeout(() => setPopSuggestionsData(resData ?? []), 10);
      }
    } catch (err) {
      messageApi.open({
        type: "error",
        content: `${err}`,
        duration: 2
      });
    }
  }, []);

  const handleOnChange = useCallback(
    (newData: DataType) => {
      setData(newData);
      setPopSuggestionsData([]);
      getResponseFromChatGpt(newData);
    },
    [getResponseFromChatGpt]
  );

  useEffect(() => {
    setTimeout(() => {
      setData(mockedInfo);
    }, 500);
  }, []);

  if (!username) {
    return null;
  }

  return (
    <div className={styles.container}>
      {contextHolder}
      <div className={styles.chatContainer}>
        <ModeSwitcher data={data} onSwitch={newData => setData(newData)} />
        <UserInfo {...data.userMe} />
        <ChatBox data={data} popSuggestionsData={popSuggestionsData} onChange={handleOnChange} />
      </div>
      <div className={styles.messageContainer}>
        <RecentConverstaions username={username} data={data} onChange={handleOnChange} />
      </div>
      <div className={styles.otherInfo}>
        <CalendarInfo data={data} onChange={handleOnChange} />
      </div>
    </div>
  );
};

export default FhlChatGpt;
