import styled from "styled-components";
import { THEME } from "theme/constants/constants";

interface ShowPasswordProps {
  $active?: boolean;
}

export const Warning = styled.p`
  position: absolute;
  color: ${({ theme }) => theme.colors.red};
  top: -2%;
  right: 1%;
  font-size: ${THEME.size.small};
`;

export const InputWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const ShowPassword = styled.svg<ShowPasswordProps>`
  position: absolute;
  top: 51%;
  right: 5%;
  cursor: pointer;
  fill: ${(props) => (props.$active ? props.theme.colors.lightBlue : props.theme.colors.subGray)};

  &:hover {
    fill: ${(props) => (props.$active ? props.theme.colors.subGray : props.theme.colors.lightBlue)};
  }
`;
