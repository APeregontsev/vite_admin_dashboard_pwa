import styled from "styled-components";
import { THEME } from "theme/constants/constants";

export const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
  padding-right: 14px;
  border-right: 1px solid ${({ theme }) => theme.colors.grayscaleDivider};
  height: 44px;
  position: relative;
  width: 100%;
`;

interface NotificatinProps {
  $highlight?: boolean;
}

export const NotificationWrapper = styled.div<NotificatinProps>`
  display: flex;
  position: relative;

  ${(props) =>
    props.$highlight &&
    `
    &::before {
    content: attr(data-count);
    background-color: ${props.theme.colors.red};
    border-radius: 50px;
    cursor:pointer;
    color: ${props.theme.colors.hoverWhite};
    display: flex;
    align-items: center;
    justify-content:center;
    font-size: ${THEME.size.small};
    font-weight: ${THEME.weight.bold};
    height: 20px;
    min-width: 20px;
    padding: 1px 4px;
    position: absolute;
    right: -9px;
    top: -8px;
    width: auto;
    z-index: 99;
    }`}
`;

export const SearchIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
