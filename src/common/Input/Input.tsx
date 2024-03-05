import { useState } from "react";
import { FC } from "react";
import { showPasswordSvg } from "./Icons/showPasswordIcon";
import { InputProps } from "./type";
import { InputWrapper, ShowPassword, Warning } from "./style";
import { InputTitle } from "ui/Titles";
import { StyledInput } from "ui/Input";

const Input: FC<InputProps> = ({
  type,
  name,
  label,
  placeholder,
  warningMsg,
  register,
  rules,
  popup,
  defaultValue,
}) => {
  // State and Handler for ShowPassword functionality
  const [inputType, setInputType] = useState<string>(type);

  function showPasswordHandler() {
    setInputType((oldState) => {
      return oldState === "password" ? "text" : "password";
    });
  }

  return (
    <InputWrapper>
      <InputTitle $popup={popup} htmlFor={name}>
        {label}
      </InputTitle>
      <StyledInput
        {...register(name, rules)}
        type={type === "password" ? inputType : type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        id={name}
        accept={type === "file" ? "image/*" : ""}
      />

      {type === "password" && (
        <ShowPassword
          $active={inputType === "text"}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          onClick={showPasswordHandler}
        >
          <path d={showPasswordSvg} />
        </ShowPassword>
      )}

      <Warning>{warningMsg}</Warning>
    </InputWrapper>
  );
};

export default Input;
