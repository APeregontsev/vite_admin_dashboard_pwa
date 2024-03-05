import { FC } from "react";
import { FooterWrapper } from "./style";
import { useNavigate } from "react-router-dom";
import { Subtitle, Title } from "ui/Titles";
import { FooterLink } from "../Footer/style";

const ResetEmailBlock: FC<{ setResetEmailSent: React.Dispatch<React.SetStateAction<boolean>> }> = ({
  setResetEmailSent,
}) => {
  const navigate = useNavigate();

  function navigateToLogin() {
    setResetEmailSent(false);
    navigate("/auth/login");
  }

  return (
    <>
      <Title>Forgot password?</Title>
      <Subtitle>
        Link to change your password has been sent to provided email if we have it inside our system
      </Subtitle>

      <FooterWrapper>
        <FooterLink onClick={navigateToLogin}>Log in</FooterLink>
      </FooterWrapper>
    </>
  );
};

export default ResetEmailBlock;
