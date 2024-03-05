import styled from "styled-components";
import { THEME } from "theme/constants/constants";

const SectionWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.grayscaleDivider};
  border-radius: ${THEME.border.radius.normal};
`;

const SectionBody = styled.div`
  flex-grow: 1;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

// Styling for TABLE

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;

const THead = styled.thead`
  text-align: left;
  color: ${({ theme }) => theme.colors.grayscaleGray};
  background-color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-style: normal;
  font-weight: ${THEME.weight.bold};
  line-height: normal;
  letter-spacing: 0.2px;
  position: sticky;
  top: 0;
  z-index: 8;
`;

const TH = styled.th`
  border-bottom: 2px solid ${({ theme }) => theme.colors.grayscaleDivider};
  padding: 12px;

  &:first-child {
    padding-left: 32px;
  }
`;

const TBody = styled.tbody`
  font-weight: ${THEME.weight.mid_bold};

  & tr {
    cursor: default;

    &:hover {
      background-color: ${({ theme }) => theme.colors.cellHover};
    }
  }
`;

const TD = styled.td`
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayscaleDivider};

  &:first-child {
    padding-left: 32px;
  }

  & svg {
    max-width: none;
  }
`;

const TR = styled.tr``;

export { SectionWrapper, SectionBody, Table, THead, TH, TBody, TD, TR };
