import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { message } from "antd";
import ChatBox from "./ChatBox";
import RecentConverstaions from "./RecentConversations";
import CalendarInfo from "./CalerdarInfo";
import { postData } from "@/services";
import { apiUri, mockedDocInfo, mockedInfo } from "../mocked-data";
import { ChatGptResponseType, DataType, UserType } from "./index.interface";

import styles from "./index.less";
import RelatedConversations from "./RelatedConversations";
import Header from "./Header";
import RelatedDocuments from "./RelatedDocuments";

const FhlChatGpt: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<DataType>({});
  const [popSuggestionsData, setPopSuggestionsData] = useState<ChatGptResponseType[]>([]);
  const [busy, setBusy] = useState<boolean>(false);
  const [isShowCalendar, setIsShowCalendar] = useState<boolean>(true);

  const username = useMemo(() => data.userMe?.name, [data]);

  const getResponseFromChatGpt = useCallback(async (newData: DataType) => {
    try {
      setBusy(true);

      const copyData = { ...newData };

      const res = await postData(apiUri, copyData);

      const resData = res.data as ChatGptResponseType[];
      setBusy(false);

      if (!!resData?.length) {
        setTimeout(() => setPopSuggestionsData(resData ?? []), 10);
      }
    } catch (err) {
      setBusy(false);
      messageApi.open({
        type: "error",
        content: `${err}`,
        duration: 2
      });
    }
  }, []);

  const handleOnChange = useCallback(
    (newData: DataType) => {
      // setBusy(true);
      setData(newData);
      // setPopSuggestionsData([]);
      // getResponseFromChatGpt(newData);
    },
    [getResponseFromChatGpt]
  );

  const updateUserStatus = useCallback(
    (status: string, userType: UserType) => {
      if (!status) {
        return;
      }
      var copyData = { ...data };
      if (userType === UserType.Me) {
        copyData.userMe!.status = status;
      } else {
        copyData.userTarget!.status = status;
      }

      setData(copyData);
    },
    [data, isShowCalendar]
  );

  const handleHeaderChange = useCallback(
    (newData: DataType, isClearSmartReply: Boolean) => {
      setData(newData);
      if (isClearSmartReply) {
        setPopSuggestionsData([]);
      }
    },
    [data]
  );
  useEffect(() => {
    let dataCopy;
    if (isShowCalendar) {
      dataCopy = { ...mockedInfo };
    } else {
      dataCopy = { ...mockedDocInfo };
    }
    const message = dataCopy.receivedMessage;
    dataCopy.recentConversations = [
      [
        ...(dataCopy.recentConversations?.[0] ?? []),
        { name: dataCopy.userTarget?.name, message: message }
      ]
    ];
    setData(dataCopy);
  }, [isShowCalendar]);

  if (!username) {
    return null;
  }

  return (
    <div className={styles.container}>
      {contextHolder}
      <div className={styles.header}>
        <Header
          data={data}
          onChange={handleHeaderChange}
          onSwitch={(isShowCalendar: boolean) => {
            setIsShowCalendar(isShowCalendar);
            setPopSuggestionsData([]);
          }}
        ></Header>
      </div>
      <div className={styles.body}>
        <div className={styles.chatContainer}>
          {/* <UserInfo {...data.userMe} /> */}
          <ChatBox
            busy={busy}
            data={data}
            popSuggestionsData={popSuggestionsData}
            onStatusChange={updateUserStatus}
            onChange={handleOnChange}
            onCallApi={() => getResponseFromChatGpt(data)}
          />
        </div>
        {/* <div className={styles.messageContainer}>
        <RecentConverstaions username={username} data={data} onChange={handleOnChange} />
      </div> */}
        <div className={styles.messageContainer}>
          <RelatedConversations data={data} onChange={newData => setData(newData)} />
        </div>
        <div className={styles.otherInfo}>
          {isShowCalendar ? (
            <CalendarInfo data={data} onChange={newData => setData(newData)} />
          ) : (
            <RelatedDocuments data={data} onChange={newData => setData(newData)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FhlChatGpt;
