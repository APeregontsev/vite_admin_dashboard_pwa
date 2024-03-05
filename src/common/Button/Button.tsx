import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { StyledButton } from "./style";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: "main" | "cancel" | "delete" | "add";
  buttonSize?: "normal" | "medium" | "small";
  buttonWidth?: "wide" | "fixed";
  backgroundColor?: string;
  color?: string;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({
  buttonType = "main",
  buttonSize = "normal",
  buttonWidth = "fixed",
  backgroundColor,
  color,
  children,
  ...rest
}) => {
  return (
    <StyledButton
      $buttonType={buttonType}
      $size={buttonSize}
      $width={buttonWidth}
      style={{ backgroundColor, color }}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
