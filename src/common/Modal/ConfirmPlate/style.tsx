import styled from "styled-components";
import { THEME } from "theme/constants/constants";

const ConfirmWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
`;

const ConfirmBody = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 10px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  gap: 20px;
`;

const HighlightText = styled.span`
  color: ${({ theme }) => theme.colors.grayscaleHighlight};
  font-weight: ${THEME.weight.bold};
`;

export { ConfirmWrapper, ConfirmBody, ButtonsWrapper, HighlightText };
