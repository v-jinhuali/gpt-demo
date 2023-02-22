import EditableText from "@/components/EditableText";
import { mockedInfo } from "@/mocked-data";
import { Radio, RadioChangeEvent, Switch } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { DataType, Mode } from "../index.interface";
import styles from "./index.less";

interface IToolbarProps {
  data?: DataType;
  onChange?: (newVal: DataType) => void;
  onSwitch?: (isShowCalendar: boolean) => void;
}

const Toolbar: React.FC<IToolbarProps> = ({ data, onChange, onSwitch }) => {
  const [mode, setMode] = useState<Mode>(Mode.Reply);
  const [currentTime, setCurrentTime] = useState<string>(data?.currentTime ?? "2/13/2023 13:45");

  const handleRadioGroupChange = useCallback(
    (e: RadioChangeEvent) => {
      setMode(e.target.value);

      const dataCopy = { ...data };

      dataCopy.mode = e.target.value;
      data?.recentConversations?.[0]?.splice(0, data?.recentConversations?.[0].length ?? 0);
      if (e.target.value === Mode.Reply) {
        dataCopy.recentConversations = [
          [
            ...(dataCopy.recentConversations?.[0] ?? []),
            { name: dataCopy.userTarget?.name, message: dataCopy.receivedMessage }
          ]
        ];
      }

      onChange?.(dataCopy);
    },
    [data]
  );

  const handleEditableEnter = useCallback(
    (value: string, id: number | string) => {
      if (!value) {
        return;
      }
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
      <Switch
        className={styles.switch}
        checkedChildren="Calendar"
        unCheckedChildren="Documents"
        defaultChecked
        onChange={(checked: boolean) => {
          setMode(Mode.Reply);
          onSwitch?.(checked);
        }}
      />
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
