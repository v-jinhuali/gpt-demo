import React, { useCallback } from "react";
import { DataType, UserType } from "../index.interface";
import Toolbar from "../Toolbar";
import UserInfo from "../UserInfo";
import styles from "./index.less";

interface IHeaderProps {
  data: DataType;
  onChange?: (data: DataType, isClearSmartReply: Boolean) => void;
  onSwitch?: (isShowCalendar: boolean) => void;
}

const Header: React.FC<IHeaderProps> = ({ data, onChange, onSwitch }) => {
  const handleToolbarChange = useCallback(
    (newData: DataType) => {
      const dataCopy = { ...newData };
      //dataCopy.recentConversations = [];
      onChange?.(dataCopy, true);
    },
    [data]
  );

  const handleUserStatusChange = useCallback(
    (status: string, userType: UserType) => {
      if (!status) {
        return;
      }
      
      const copyData = { ...data };
      console.log(copyData);
      copyData.userMe!.status = status;
      onChange?.(copyData, false);
    },
    [data]
  );
  return (
    <div>
      <UserInfo userType={UserType.Me} {...data.userMe} onChange={handleUserStatusChange} />
      <Toolbar data={data} onChange={handleToolbarChange} onSwitch={onSwitch}></Toolbar>
    </div>
  );
};

export default Header;
