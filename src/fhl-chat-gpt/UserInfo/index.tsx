import { EditableText } from "@/components";
import { Button } from "antd";
import { useCallback } from "react";
import { UserType } from "../index.interface";
import styles from "./index.less";

interface IUserInfoProps {
  userType: UserType;
  busy?: boolean;
  name?: string;
  status?: string;
  onChange?: (newValue: string, userType: UserType) => void;
  onGet?: () => void;
}

const UserInfo: React.FC<IUserInfoProps> = ({ userType, busy, name, status, onChange, onGet }) => {
  const handleChange = useCallback((status: string, id: string | number) => {
    onChange?.(status, userType);
  }, []);

  return (
    <div className={styles.userInfoContainer}>
      <div className={styles.basicInfo}>{name ?? "--"}</div>
      <div className={styles.status}>
        <div className={styles.text}>
          <span>Status: </span>
          <EditableText id={userType} value={status ?? "--"} onChange={handleChange}></EditableText>
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

export default UserInfo;
