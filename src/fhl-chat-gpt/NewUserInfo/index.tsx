import { EditableText } from "@/components";
import styles from "./index.less";

interface INewUserInfoProps {
  name?: string;
  status?: string;
  onChange?: (newValue: string, id: string | number) => void;
}

const NewUserInfo: React.FC<INewUserInfoProps> = ({ name, status, onChange }) => {
  const handleOnChange = (newVal: string, id: string | number) => {
    onChange?.(newVal, id);
  };

  return (
    <div className={styles.userInfoContainer}>
      <div className={styles.basicInfo}>{name ?? "--"}</div>
      <div className={styles.status}>
        <span>Status: </span>
        <EditableText id={'me'} value={status ?? "--"} onChange={handleOnChange}></EditableText>
      </div>
    </div>
  );
};

export default NewUserInfo;
