import styled from "styled-components";
import { THEME } from "theme/constants/constants";
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
  background-color: ${({ theme }) => theme.colors.white};

  & tr {
    cursor: pointer;

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

export { Table, THead, TH, TBody, TD, TR };
