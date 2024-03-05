import styled from "styled-components";
import { THEME } from "theme/constants/constants";

interface LogoWrapperProps {
  $dashboard?: boolean;
}

export const LogoWrapper = styled.div<LogoWrapperProps>`
  display: flex;
  flex-direction: ${(props) => (props.$dashboard ? "row" : "column")};
  align-items: center;
  justify-content: ${(props) => (props.$dashboard ? "flex-start" : "center")};
  padding: ${(props) => (props.$dashboard ? "41px 0px 0px 32px" : "32px")};
  gap: 12px;
  margin-bottom: ${(props) => (props.$dashboard ? "60px" : "0")};

  img {
    margin-top: ${(props) => (props.$dashboard ? "0" : "8px")};
    width: ${(props) => (props.$dashboard ? "32px" : "48px")};
    height: ${(props) => (props.$dashboard ? "32px" : "48px")};
  }
`;

export const LogoTitle = styled.div`
  color: ${({ theme }) => theme.colors.grayscaleSidebar};
  font-size: ${THEME.size.normalBig};
  font-weight: ${THEME.weight.bold};
  letter-spacing: ${THEME.letterSpacing[4]};
  line-height: normal;
  opacity: 0.7;
`;
