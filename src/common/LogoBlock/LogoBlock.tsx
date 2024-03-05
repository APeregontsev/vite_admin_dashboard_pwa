import { memo } from "react";
import { LogoTitle, LogoWrapper } from "./style";

const LogoBlock = ({ header }: { header?: boolean }) => {
  return (
    <LogoWrapper {...{ $dashboard: !!header }}>
      <img src="./../img/logo.svg" alt="logo" />
      <LogoTitle>Dashboard Kit</LogoTitle>
    </LogoWrapper>
  );
};

export default memo(LogoBlock);
