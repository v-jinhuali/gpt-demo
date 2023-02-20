import styles from "./index.less";

interface IUserInfoProps {
  name?: string;
  status?: string;
}

const UserInfo: React.FC<IUserInfoProps> = ({ name, status }) => {
  return (
    <div className={styles.userInfoContainer}>
      <div className={styles.basicInfo}>{name ?? "--"}</div>
      <div className={styles.status}>
        <span>Statius: </span>
        <span>{status ?? "--"}</span>
      </div>
    </div>
  );
};

export default UserInfo;
