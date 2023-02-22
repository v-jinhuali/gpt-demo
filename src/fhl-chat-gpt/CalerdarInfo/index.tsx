import { FC, useCallback, useMemo } from "react";
import MeetingInfo from "./MeetingInfo";
import { DataType, MeetingInfoType } from "../index.interface";

import styles from "./index.less";
import { Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface ICalendarInfoProps {
  data?: DataType;
  onChange?: (newVal: DataType) => void;
}

const CalendarInfo: FC<ICalendarInfoProps> = ({ data, onChange }) => {
  const meetings = useMemo(
    () => data?.userMe?.calendar?.map((item, index) => ({ ...item, index })) ?? [],
    [data]
  );

  const handleMeetingChange = useCallback(
    (newVal: MeetingInfoType, id: number) => {
      const dataCopy = { ...data };

      if (!dataCopy.userMe!.calendar) {
        dataCopy.userMe!.calendar = [];
      }

      dataCopy.userMe!.calendar[id] = newVal;
      onChange?.(dataCopy);
    },
    [data, onChange]
  );

  const addMeeting = useCallback(() => {
    const dataCopy = { ...data };
    dataCopy.userMe?.calendar?.push({
      title: "meeting",
      startTime: "2/16/2023 14:00",
      endTime: "2/16/2023 15:00",
      checked: true
    } as MeetingInfoType);
    onChange?.(dataCopy);
  }, [onChange]);

  return (
    <>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Calendar</h2>
        <Tooltip title="Add a meeting">
          <Button type="primary" icon={<PlusOutlined />} onClick={addMeeting} />
        </Tooltip>
      </div>
      <div className={styles.container}>
        {meetings.map(item => (
          <MeetingInfo
            key={item.index}
            id={item.index}
            meeting={item}
            onChange={handleMeetingChange}
          />
        ))}
      </div>
    </>
  );
};

export default CalendarInfo;
