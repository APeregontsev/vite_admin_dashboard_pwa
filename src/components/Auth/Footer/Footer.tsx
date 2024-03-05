import { useNavigate } from "react-router-dom";
import { FooterLink, FooterText, FooterWrapper } from "./style";

const LoginFooter = () => {
  const navigate = useNavigate();

  return (
    <FooterWrapper>
      <FooterText>Don’t have an account?</FooterText>
      <FooterLink onClick={() => navigate("/auth/signup")}>Sign up</FooterLink>
    </FooterWrapper>
  );
};

export default LoginFooter;
