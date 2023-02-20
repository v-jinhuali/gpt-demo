import { useCallback, useEffect, useMemo, useState } from "react";
import { EditableText } from "../../../components";
import { MeetingInfoType } from "../../index.interface";

import styles from "./index.less";

interface IMeetingInfoProps {
  id: number;
  meeting?: MeetingInfoType;
  onChange?: (newVal: MeetingInfoType, id: number) => void;
}

const MeetingInfo: React.FC<IMeetingInfoProps> = ({ id, meeting, onChange }) => {
  const { title, startTime, endTime } = useMemo(() => {
    const title = meeting?.title ?? "";
    const startTime = meeting?.startTime ?? "";
    const endTime = meeting?.endTime ?? "";

    return {
      title,
      startTime,
      endTime
    };
  }, [meeting]);

  const handleChange = useCallback(
    (value: string, key: string | number) => {
      const newMeeting = { ...meeting, [key]: value };
      onChange?.(newMeeting, id);
    },
    [id, meeting, onChange]
  );

  if (!title) {
    return null;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <EditableText
            className={styles.titleText}
            id={"title"}
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className={styles.timeRange}>
          <EditableText
            className={styles.timeText}
            id={"startTime"}
            value={startTime ?? "**"}
            onChange={handleChange}
          />
          <span> - </span>
          <EditableText
            className={styles.timeText}
            id={"endTime"}
            value={endTime ?? "**"}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default MeetingInfo;
