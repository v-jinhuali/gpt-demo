import { Radio, RadioChangeEvent } from "antd";
import React, { useCallback, useState } from "react";
import { DataType, Mode } from "../index.interface";
import styles from "./index.less";

interface IModeSwitcherProps {
  data?: DataType;
  onSwitch?: (newVal: DataType) => void;
}

const ModeSwitcher: React.FC<IModeSwitcherProps> = ({ data, onSwitch }) => {
  const [mode, setMode] = useState<Mode>(Mode.Starter);

  const handleRadioGroupChange = useCallback(
    (e: RadioChangeEvent) => {
      setMode(e.target.value);
      
      const dataCopy = { ...data };
      dataCopy.mode = e.target.value;
      
      onSwitch?.(dataCopy);
    },
    [mode]
  );

  return (
    <div className={styles.radioGroupContainer}>
      <Radio.Group value={mode} onChange={handleRadioGroupChange}>
        <Radio.Button value={Mode.Starter}>Starter</Radio.Button>
        <Radio.Button value={Mode.Reply}>Reply</Radio.Button>
      </Radio.Group>
    </div>
  );
};
export default ModeSwitcher;
