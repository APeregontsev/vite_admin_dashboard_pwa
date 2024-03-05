import styled from "styled-components";
import { THEME } from "../../../../theme/constants/constants";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: center;
  padding: 32px 0px 12px 0px;
  max-width: 500px;
  min-width: 430px;
  gap: 24px;

  @media (max-width: 540px) {
    flex-direction: column;
    align-items: flex-start;
    min-width: auto;
  }
`;

const InnerForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  gap: 24px;
  flex-grow: 2;

  @media (max-width: 540px) {
    width: 100%;
  }
`;

const ActionWrapper = styled.div`
  padding: 24px;
  border-radius: ${THEME.border.radius.normal};
  border: 1px solid ${({ theme }) => theme.colors.grayscaleDivider};
  background-color: ${({ theme }) => theme.colors.white};
`;

const ActionTitle = styled.h2`
  font-size: ${THEME.size.normalBig};
  font-weight: ${THEME.weight.bold};
  color: ${({ theme }) => theme.colors.digitColor};
`;

const ActionInputContainer = styled.div``;

export { Wrapper, Form, ActionWrapper, ActionTitle, ActionInputContainer, InnerForm };
