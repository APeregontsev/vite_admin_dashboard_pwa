import styled from "styled-components";

export const StyledCloseSVG = styled.svg`
  cursor: pointer;
  fill: #b2b2b2;

  &:hover {
    fill: ${({ theme }) => theme.colors.red};
  }
`;
