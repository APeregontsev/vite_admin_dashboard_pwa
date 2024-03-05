import styled from "styled-components";
import { THEME } from "theme/constants/constants";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  background-color: transparent;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
`;

export const DashboardBody = styled.main`
  width: 100%;
  flex-grow: 1;
  overflow: hidden;
`;

export const DashboardWrapper = styled.section`
  width: 100%;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;

  @media (max-width: 700px) {
    padding: 20px;
  }
`;

export const DataGridWrapper = styled.section`
  border-radius: ${THEME.border.radius.normal};
  background: ${({ theme }) => theme.colors.white};
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;
