import styled from "styled-components";
import { THEME } from "theme/constants/constants";

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${THEME.border.radius.normal};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 24px;
`;

export { CardWrapper, Form };
