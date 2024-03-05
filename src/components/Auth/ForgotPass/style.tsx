import styled from "styled-components";
import { THEME } from "theme/constants/constants";

export const ForgotWrapper = styled.div`
  margin-top: -4px;
  margin-bottom: -18px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ForgotText = styled.p`
  color: ${({ theme }) => theme.colors.grayscaleGray};
  letter-spacing: ${THEME.letterSpacing[3]};
  font-weight: ${THEME.weight.normal};
  line-height: 20px;
`;

export const ForgotLink = styled.button`
  margin-left: 5px;
  color: ${({ theme }) => theme.colors.mainBlue};
  letter-spacing: ${THEME.letterSpacing[2]};
  font-weight: ${THEME.weight.mid_bold};
  line-height: 20px;
`;
