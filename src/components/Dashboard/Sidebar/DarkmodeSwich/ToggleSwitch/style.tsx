import { styled } from "styled-components";

const ToggleSwitchWrapper = styled.div`
  /*   display: flex;
  align-items: center;
  justify-content: center; */
`;

const CheckboxToggle = styled.input`
  opacity: 0;
  position: absolute;

  &:hover {
    & + label {
      &::before {
        background-color: #676a7dab;
      }
    }
  }

  &:checked {
    & + label {
      &::after {
        left: 1.6em;
      }
    }
  }

  & + label {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;

    &::before {
      content: "";
      width: 3em;
      height: 1.6em;
      background-color: #676a7d;
      border-radius: 1em;
    }

    &::after {
      content: "";
      position: absolute;
      left: 0.2em;
      width: 1.2em;
      height: 1.2em;
      background-color: ${({ theme }) => theme.colors.toggleMode};
      border-radius: 1em;
      transition: all 0.3s;
    }
  }
`;

export { ToggleSwitchWrapper, CheckboxToggle };
