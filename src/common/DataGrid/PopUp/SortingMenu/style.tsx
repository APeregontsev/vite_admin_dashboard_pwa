import styled from "styled-components";
import { THEME } from "theme/constants/constants";

const PopupMenuWrapper = styled.div`
  display: flex;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.popupBackground};
  padding: 12px;
  top: 140%;
  left: 0%;
  z-index: 10;
  border-radius: ${THEME.border.radius.normal};
  min-width: 142px;
  flex-direction: column;
`;

const SortingItem = styled.div`
  padding: 5px 5px 5px 20px;
  cursor: pointer;
  position: relative;
  user-select: none;

  &:hover {
    color: ${({ theme }) => theme.colors.popupHover};
  }

  &.active {
    color: ${({ theme }) => theme.colors.red};
    font-weight: ${THEME.weight.bold};

    &:hover {
      color: ${({ theme }) => theme.colors.popupHover};
      font-weight: ${THEME.weight.bold};
    }

    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 35%;
      left: -2%;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 9px solid ${({ theme }) => theme.colors.red};
      transform: rotate(180deg);
    }

    &.desc {
      &:before {
        transform: rotate(0deg);
      }
    }
  }
`;

export { PopupMenuWrapper, SortingItem };
