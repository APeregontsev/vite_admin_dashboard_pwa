import styled from "styled-components";
import { THEME } from "theme/constants/constants";

const SelectWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const StyledSelect = styled.select`
  color: ${({ theme }) => theme.colors.inputText};
  height: 42px;
  width: 100%;
  padding: 11px 16px;
  border-radius: ${THEME.border.radius.normal};
  border: 1px solid ${({ theme }) => theme.colors.grayscaleLightest};
  background: ${({ theme }) => theme.colors.grayscaleExtra_light} url("./../img/select_arrow.svg") no-repeat;
  background-position: calc(100% - 0.75rem) center !important;
  -moz-appearance: none !important;
  -webkit-appearance: none !important;
  appearance: none !important;
  padding-right: 2rem !important;
  cursor: pointer;

  &:focus-visible {
    outline: none;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.grayscaleExtra_light} url("./../img/select_arrow_hover.svg")
      no-repeat;
  }
`;

const Warning = styled.p`
  position: absolute;
  color: ${({ theme }) => theme.colors.red};
  top: -3%;
  right: 1%;
  font-size: ${THEME.size.small};
`;

export { StyledSelect, SelectWrapper, Warning };
