import { useNavigate } from "react-router-dom";
import { ForgotLink, ForgotText, ForgotWrapper } from "./style";
import { FieldValues, UseFormReset } from "react-hook-form";
import { FC } from "react";
import { errorsMapping } from "../../../firebase/errorsMapping";

type ForgotPassProps = {
  errorText: string;
  reset: UseFormReset<FieldValues>;
  setApiError: React.Dispatch<React.SetStateAction<string>>;
};

const ForgotPass: FC<ForgotPassProps> = ({ errorText, reset, setApiError }) => {
  const navigate = useNavigate();

  if (!errorText || errorText !== errorsMapping.wrongPassword.firebaseErr) return null;

  return (
    <ForgotWrapper>
      <ForgotText>Forgot password?</ForgotText>
      <ForgotLink
        onClick={() => {
          setApiError("");
          reset();
          navigate("/auth/forgotpassword");
        }}
      >
        Reset password
      </ForgotLink>
    </ForgotWrapper>
  );
};

export default ForgotPass;
