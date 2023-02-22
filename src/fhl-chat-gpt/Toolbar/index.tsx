import EditableText from "@/components/EditableText";
import { Radio, RadioChangeEvent } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { DataType, Mode } from "../index.interface";
import styles from "./index.less";

interface IToolbarProps {
  data?: DataType;
  onChange?: (newVal: DataType) => void;
}

const Toolbar: React.FC<IToolbarProps> = ({ data, onChange }) => {
  const [mode, setMode] = useState<Mode>(Mode.Reply);
  const [currentTime, setCurrentTime] = useState<string>(data?.currentTime ?? "2/13/2023 13:45");

  const handleRadioGroupChange = useCallback(
    (e: RadioChangeEvent) => {
      setMode(e.target.value);

      const dataCopy = { ...data };
      dataCopy.mode = e.target.value;

      if (e.target.value === Mode.Reply) {
        const message = "Hi Adam, How's the status of your FHL project?";
        dataCopy.receivedMessage = message;
        dataCopy.recentConversations = [
          [
            ...(dataCopy.recentConversations?.[0] ?? []),
            { name: dataCopy.userTarget?.name, message: message }
          ]
        ];
      } else {
        dataCopy.receivedMessage = "";
        data?.recentConversations?.[0]?.splice(0, data?.recentConversations?.[0].length ?? 0);
      }

      onChange?.(dataCopy);
    },
    [data]
  );
  useEffect(()=>{
    const dataCopy = { ...data };
    const message = "Hi Adam, How's the status of your FHL project?";
    dataCopy.receivedMessage = message;
    dataCopy.recentConversations = [
      [
        ...(dataCopy.recentConversations?.[0] ?? []),
        { name: dataCopy.userTarget?.name, message: message }
      ]
    ];
    onChange?.(dataCopy);
  },[]);

  const handleEditableEnter = useCallback(
    (value: string, id: number | string) => {
      setCurrentTime(value);

      const dataCopy = { ...data };
      dataCopy.currentTime = value;

      onChange?.(dataCopy);
    },
    [data]
  );

  return (
    <div className={styles.toolbarContainer}>
      <Radio.Group value={mode} onChange={handleRadioGroupChange}>
        <Radio.Button value={Mode.Reply}>Reply</Radio.Button>
        <Radio.Button value={Mode.Starter}>Starter</Radio.Button>
      </Radio.Group>
      <EditableText
        id="currentTime"
        className={styles.editableText}
        value={currentTime}
        onChange={handleEditableEnter}
      />
    </div>
  );
};
export default Toolbar;
