import { EditableText } from "@/components";
import cn from "classnames";
import { Button, Divider } from "antd";
import { useCallback } from "react";
import { DataType, UserType } from "../index.interface";
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
    <div className={cn(styles.userInfoContainer)}>
      <div className={styles.text}>
        <div className={styles.basicInfo}>
          {userType === UserType.Me ? <div>{name ?? "--"} (Me)</div> : <div>{name ?? "--"}</div>}
        </div>
        <div className={styles.status}>
          <span>Status: </span>
          <EditableText id={userType} value={status ?? "--"} onChange={handleChange}></EditableText>
        </div>
      </div>
      {onGet && (
        <Button disabled={busy} type="primary" onClick={onGet}>
          Get suggestions
        </Button>
      )}
    </div>
  );
};

export default UserInfo;
