import styled from "styled-components";
import { THEME } from "../../../../../theme/constants/constants";

const AgendaBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 340px;
  height: 100%;
  padding: 6px 0px;
  border-left: 1px solid ${({ theme }) => theme.colors.grayscaleDivider};

  @media (max-width: 1250px) {
    min-width: 25%;
  }

  @media (max-width: 750px) {
    flex-direction: row;
    height: auto;
    width: 100%;
    border-left: none;
    border-top: 1px solid ${({ theme }) => theme.colors.grayscaleDivider};
  }

  @media (max-width: 620px) {
    display: none;
  }
`;

const AgendaBlockContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayscaleDivider};
  padding: 12px 24px;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 750px) {
    border-bottom: none;
  }
`;

const AgendaTitle = styled.div`
  color: ${({ theme }) => theme.colors.subGray};
  text-align: center;
  font-size: ${THEME.size.normal};
  font-weight: ${THEME.weight.mid_bold};
  line-height: 22px;
  letter-spacing: ${THEME.letterSpacing[3]};
`;

const AgendaDigit = styled.div`
  color: ${({ theme }) => theme.colors.digitColor};
  text-align: center;
  font-size: ${THEME.size.large};
  font-weight: ${THEME.weight.bold};
  letter-spacing: ${THEME.letterSpacing[3]};
`;

export { AgendaBlockWrapper, AgendaBlockContainer, AgendaTitle, AgendaDigit };
