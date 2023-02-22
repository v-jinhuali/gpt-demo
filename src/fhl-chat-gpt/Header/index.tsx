import React from "react";
import { DataType, UserType } from "../index.interface";
import Toolbar from "../Toolbar";
import UserInfo from "../UserInfo";
import styles from "./index.less";

interface IHeaderProps {
  data: DataType;
  onChange?: (data: DataType) => void;
}

const Header: React.FC<IHeaderProps> = ({ data, onChange }) => {
  return (
    <>
      <Toolbar data={data}></Toolbar>
      <UserInfo userType={UserType.Me} {...data.userMe} onChange={() => {}} />
    </>
  );
};

export default Header;
