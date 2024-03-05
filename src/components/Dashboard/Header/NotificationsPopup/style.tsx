import styled from "styled-components";
import { THEME } from "theme/constants/constants";

export const NotificationsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 150%;
  right: -160px;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  width: 320px;
  min-height: 200px;
  z-index: 99;
  border-radius: ${THEME.border.radius.normal};
  padding: 20px 10px 10px 10px;
  border: 1px solid ${({ theme }) => theme.colors.grayscaleDivider};
  filter: drop-shadow(${({ theme }) => theme.colors.grayscaleDivider} 0 0 0.75rem);
  overflow-y: hidden;
`;

export const InnerContainer = styled.div`
  flex-grow: 1;
  max-height: 500px;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const CloseAll = styled.div`
  text-align: center;
  cursor: pointer;
  padding: 10px;

  &:hover {
    font-weight: ${THEME.weight.mid_bold};
  }
`;

export const NoNotifications = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  margin: auto;
  color: ${({ theme }) => theme.colors.grayscaleGray};
`;
