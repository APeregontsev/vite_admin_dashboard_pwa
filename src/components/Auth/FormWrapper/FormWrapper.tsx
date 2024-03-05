import { FC } from "react";
import { CardWrapper } from "./style";
import LogoBlock from "common/LogoBlock";
import ResetEmailBlock from "../ResetEmailBlock";

type FormWrapperProps = {
  children: React.ReactNode;
  showEmailSent: boolean;
  resetEmailSent: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormWrapper: FC<FormWrapperProps> = ({ showEmailSent, resetEmailSent, children }) => {
  return (
    <CardWrapper>
      <LogoBlock />
      {showEmailSent ? <ResetEmailBlock setResetEmailSent={resetEmailSent} /> : children}
    </CardWrapper>
  );
};

export default FormWrapper;
