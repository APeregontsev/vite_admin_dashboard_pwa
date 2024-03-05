import { styled } from "styled-components";
import { THEME } from "theme/constants/constants";

const MenuItem = styled.li`
  border-left: 3px solid transparent;
  font-size: ${THEME.size.normal};
  letter-spacing: ${THEME.letterSpacing[2]};
  font-weight: ${THEME.weight.normal};
  color: ${({ theme }) => theme.colors.grayscaleSidebar};
  padding: 18px 24px 18px 32px;
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    fill: ${({ theme }) => theme.colors.menuItemSVG};
    opacity: 0.4;
  }

  span {
    margin-left: 24px;
    color: ${({ theme }) => theme.colors.grayscaleSidebar};
  }

  &:hover {
    background-color: rgba(159, 162, 180, 0.08);
    cursor: pointer;

    span {
      color: ${({ theme }) => theme.colors.lightBlue};
      z-index: 10;
    }

    svg {
      fill: ${({ theme }) => theme.colors.lightBlue};
      opacity: 1;
      z-index: 10;
    }
  }

  &.active {
    border-left: 3px solid ${({ theme }) => theme.colors.lightBlue};
    background-color: rgba(159, 162, 180, 0.08);
    cursor: default;

    span {
      color: ${({ theme }) => theme.colors.lightBlue};
      z-index: 10;
    }

    svg {
      fill: ${({ theme }) => theme.colors.lightBlue};
      opacity: 1;
      z-index: 10;
    }
  }
`;

export { MenuItem };
