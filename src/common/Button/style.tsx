import styled, { DefaultTheme } from "styled-components";
import { THEME } from "theme/constants/constants";

interface ButtonProps {
  $buttonType: "main" | "cancel" | "delete" | "add";
  $size: "normal" | "medium" | "small";
  $width: "wide" | "fixed";
  theme: DefaultTheme;
}

function getType(props: ButtonProps) {
  switch (props.$buttonType) {
    case "main":
      return `
      background-color: ${props.theme.colors.mainBlue};
      color: ${props.theme.colors.hoverWhite};

      &:hover {
        background-color: ${props.theme.colors.mainBlueHover};
      }`;

    case "cancel":
      return `
        background-color: ${props.theme.colors.hoverWhite};
        color: ${props.theme.colors.mainBlue};

      &:hover {
        background-color: ${props.theme.colors.hoverWhite};
        font-weight: ${THEME.weight.bold};
               }`;

    case "add":
      return `
       background-color: ${props.theme.colors.addButton};
       color: ${props.theme.colors.addButtonText};
 
      &:hover {
        font-weight: ${THEME.weight.bold};
        background-color: ${props.theme.colors.addButton};
              }`;

    case "delete":
      return `
        padding: 0 20px;
        margin-top: 0px;
        background-color: #f12b2cb0;

      &:hover {
        font-weight: ${THEME.weight.bold};
        background-color: ${props.theme.colors.red};
      }`;
  }
}

function getSize(props: ButtonProps) {
  switch (props.$size) {
    case "normal":
      return `height: 48px;`;

    case "medium":
      return `height: 42px;`;

    case "small":
      return `height: 36px;`;
  }
}

function getWidth(props: ButtonProps) {
  switch (props.$width) {
    case "wide":
      return `width: 100%;`;

    case "fixed":
      return `width: 135px;`;
  }
}

const StyledButton = styled.button<ButtonProps>`
  border-radius: ${THEME.border.radius.normal};
  font-weight: ${THEME.weight.mid_bold};
  letter-spacing: ${THEME.letterSpacing[2]};
  line-height: 20px;
  text-align: center;
  cursor: pointer;

  ${(props) => getType(props)};

  ${(props) => getSize(props)};

  ${(props) => getWidth(props)};
`;

export { StyledButton };
