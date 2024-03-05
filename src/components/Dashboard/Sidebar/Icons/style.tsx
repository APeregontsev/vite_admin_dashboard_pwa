import styled from "styled-components";

export const StyledSVG = styled.svg`
  display: none;
  cursor: pointer;
  align-self: end;
  margin: 10px 10px 0px 0px;

  & path {
    opacity: 1;
    fill: #ff0000c4;
    stroke: #ff0000c4;
    stroke-width: 3.23161912;
    stroke-linecap: round;
    stroke-miterlimit: 4;
    fill-opacity: 1;
    stroke-opacity: 1;
  }

  @media (max-width: 1050px) {
    display: block;
  }
`;
