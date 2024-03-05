import styled from "styled-components";
import { THEME } from "theme/constants/constants";

export const NotificationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.grayscaleDivider};
  padding: 5px;
  border-radius: ${THEME.border.radius.normal};
  gap: 5px;
  min-height: 54px;
`;

export const NotificationIcon = styled.div`
  display: flex;
  align-items: center;
  padding: 0 5px;
`;

export const NotificationText = styled.div`
  flex-grow: 1;
  padding-left: 5px;
`;

export const NotificationClose = styled.div`
  display: flex;
  align-items: center;
`;
