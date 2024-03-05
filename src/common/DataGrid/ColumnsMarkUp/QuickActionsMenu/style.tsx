import styled from "styled-components";
import { THEME } from "theme/constants/constants";

// Wrapper for Quick action menu
interface ActionProps {
  $red?: boolean;
}

const QuickActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
`;

const QuickAction = styled.div<ActionProps>`
  min-width: 56px;
  padding: 5px;
  cursor: pointer;
  position: relative;
  user-select: none;
  color: ${(props) => (props.$red ? props.theme.colors.red : props.theme.colors.popupBlack)};

  &:hover {
    color: ${({ theme }) => theme.colors.hoverWhite};
    font-weight: ${THEME.weight.bold};
  }

  &.active {
    color: ${({ theme }) => theme.colors.red};
    font-weight: ${THEME.weight.bold};

    &:hover {
      color: ${({ theme }) => theme.colors.hoverWhite};
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

export { QuickActionsWrapper, QuickAction };
