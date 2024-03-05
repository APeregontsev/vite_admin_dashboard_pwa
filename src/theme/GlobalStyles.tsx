import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  body {
  min-height: 100vh;
  font-size: 14px;
  font-weight: 400;
  font-family: Mulish, sans-serif;
  color: ${({ theme }) => theme.colors.grayscaleBlack};
  letter-spacing: 0.3px;
  overflow: hidden; 
  }`;
