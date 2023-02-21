import { EditableText } from "@/components";
import { Button } from "antd";
import { useCallback } from "react";
import styles from "./index.less";

interface INewUserInfoProps {
  busy?: boolean;
  name?: string;
  status?: string;
  onChange?: (newValue: string, id: string | number) => void;
  onGet?: () => void;
}

const NewUserInfo: React.FC<INewUserInfoProps> = ({ busy, name, status, onChange, onGet }) => {
  const handleOnChange = useCallback(
    (newVal: string, id: string | number) => {
      onChange?.(newVal, id);
    },
    [status]
  );

  return (
    <div className={styles.userInfoContainer}>
      <div className={styles.basicInfo}>{name ?? "--"}</div>
      <div className={styles.status}>
        <div className={styles.text}>
          <span>Status: </span>
          <EditableText id={"me"} value={status ?? "--"} onChange={handleOnChange}></EditableText>
        </div>
        {onGet && (
          <Button disabled={busy} type="primary" onClick={onGet}>
            Get
          </Button>
        )}
      </div>
    </div>
  );
};

export default NewUserInfo;
