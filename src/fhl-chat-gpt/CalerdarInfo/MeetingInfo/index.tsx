import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
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
  const { title, startTime, endTime, checked } = useMemo(() => {
    const title = meeting?.title ?? "";
    const startTime = meeting?.startTime ?? "";
    const endTime = meeting?.endTime ?? "";
    const checked = meeting?.checked ?? true;

    return {
      title,
      startTime,
      endTime,
      checked
    };
  }, [id, meeting]);

  const handleChange = useCallback(
    (value: string, key: string | number) => {
      const newMeeting = { ...meeting, [key]: value };
      onChange?.(newMeeting, id);
    },
    [id, meeting, onChange]
  );

  const handleCheckboxOnChange = useCallback(
    (e: CheckboxChangeEvent) => {
      const newMeeting = { ...meeting };
      newMeeting.checked = e.target.checked;
      onChange?.(newMeeting, id);
    },
    [id, meeting]
  );

  if (!title) {
    return null;
  }

  return (
    <div className={styles.meetingCard}>
      <Checkbox checked={checked} onChange={handleCheckboxOnChange}></Checkbox>
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
    </div>
  );
};

export default MeetingInfo;
