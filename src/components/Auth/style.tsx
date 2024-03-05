import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundDark};
  overflow-y: auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 48px 32px 40px 32px;
  width: 100%;
  gap: 24px;
`;
