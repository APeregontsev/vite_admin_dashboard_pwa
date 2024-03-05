import styled from "styled-components";
import { THEME } from "theme/constants/constants";

export const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${THEME.border.radius.normal};
  width: 380px;
`;
