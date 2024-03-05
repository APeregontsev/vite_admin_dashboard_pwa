import styled from "styled-components";
import { THEME } from "../../../../theme/constants/constants";

const StyledSelect = styled.select`
  width: 100%;
  color: ${({ theme }) => theme.colors.digitColor};
  font-weight: ${THEME.weight.normal};
  line-height: 20px;
  letter-spacing: ${THEME.letterSpacing[3]};
  background-color: ${({ theme }) => theme.colors.hoverWhite};
  border: ${({ theme }) => theme.colors.hoverWhite};
  outline: ${({ theme }) => theme.colors.hoverWhite};
  border-radius: 5px;
  padding-right: 5px;
`;

export { StyledSelect };
