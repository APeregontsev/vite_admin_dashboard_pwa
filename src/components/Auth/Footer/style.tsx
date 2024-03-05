import styled from "styled-components";
import { THEME } from "theme/constants/constants";

export const FooterWrapper = styled.footer`
  width: 100%;
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.grayscaleGray};
  letter-spacing: ${THEME.letterSpacing[3]};
  font-weight: ${THEME.weight.normal};
  line-height: 20px;
`;

export const FooterLink = styled.button`
  margin-left: 5px;
  color: ${({ theme }) => theme.colors.mainBlue};
  letter-spacing: ${THEME.letterSpacing[2]};
  font-weight: ${THEME.weight.mid_bold};
  line-height: 20px;
`;
