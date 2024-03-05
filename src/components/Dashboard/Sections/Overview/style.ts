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

const DiagramSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${THEME.border.radius.normal};
  width: 100%;
  flex-grow: 1;
  border: 1px solid ${({ theme }) => theme.colors.grayscaleDivider};

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

export { Wrapper, DiagramSection };
