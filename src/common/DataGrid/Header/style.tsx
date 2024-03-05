import styled from "styled-components";
import { THEME } from "theme/constants/constants";

const SectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 35px 32px 45px 32px;
  z-index: 9;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${THEME.border.radius.normal};

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: "a" "b";
    padding: 25px 25px 35px 25px;
  }
`;

const HeaderIconsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 25px;

  @media (max-width: 600px) {
    grid-area: b;
    justify-content: start;
  }
`;

const AddBtnWrapper = styled.div`
  @media (max-width: 600px) {
    display: flex;
    grid-area: a;
    justify-content: end;
  }
`;

interface ButtonProps {
  $active?: boolean;
}

const ButtonWrapper = styled.div<ButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.grayscaleDark};
  position: relative;
  cursor: pointer;

  & span {
    width: 34px;
    color: ${(props) => (props.$active ? props.theme.colors.red : "")};
    font-weight: ${(props) => (props.$active ? THEME.weight.mid_bold : "")};
  }

  & svg {
    fill: ${(props) => (props.$active ? props.theme.colors.red : props.theme.colors.grayscaleLight)};
  }

  &:hover {
    & svg {
      fill: ${({ theme }) => theme.colors.red};
    }

    & span {
      color: ${({ theme }) => theme.colors.red};
      font-weight: ${THEME.weight.mid_bold};
    }
  }
`;

export { SectionHeader, HeaderIconsWrapper, ButtonWrapper, AddBtnWrapper };
