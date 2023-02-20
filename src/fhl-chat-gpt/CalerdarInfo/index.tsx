import { FC, useCallback, useMemo } from "react";
import MeetingInfo from "./MeetingInfo";
import { DataType, MeetingInfoType } from "../index.interface";

import styles from "./index.less";

interface ICalendarInfoProps {
  data?: DataType;
  onChange?: (newVal: DataType) => void;
}

const CalendarInfo: FC<ICalendarInfoProps> = ({ data, onChange }) => {
  const meetings = useMemo(
    () => data?.meetings?.map((item, index) => ({ ...item, index })) ?? [],
    [data]
  );

  const handleMeetingChange = useCallback(
    (newVal: MeetingInfoType, id: number) => {
      const dataCopy = { ...data };
      if (!dataCopy.meetings) {
        dataCopy.meetings = [];
      }

      dataCopy.meetings[id] = newVal;
      onChange?.(dataCopy);
    },
    [data, onChange]
  );

  return (
    <div className={styles.container}>
      {meetings.map((item, index) => (
        <MeetingInfo
          key={`${item.title}-${index}`}
          id={item.index}
          meeting={item}
          onChange={handleMeetingChange}
        />
      ))}
    </div>
  );
};

export default CalendarInfo;
