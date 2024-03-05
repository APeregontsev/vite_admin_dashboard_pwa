import styled from "styled-components";
import { THEME } from "theme/constants/constants";

interface TabNameProps {
  $active?: boolean;
}

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60%;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  width: 90%;
  height: auto;
  left: 5%;
  min-height: 200px;
  max-height: 600px;
  border-radius: ${THEME.border.radius.normal};
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.grayscaleDivider};
  filter: drop-shadow(${({ theme }) => theme.colors.grayscaleDivider} 0 0 0.75rem);
  overflow: hidden;
  z-index: 99;
`;

export const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  overflow: auto;
`;

export const TitleWrapper = styled.div``;

export const TabsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  border-radius: ${THEME.border.radius.normal};
  flex-wrap: wrap;
  padding-bottom: 15px;
`;

export const TabName = styled.div<TabNameProps>`
  border: 1px solid #dfe0eb;
  padding: 5px 10px;
  border-radius: ${THEME.border.radius.normal};
  cursor: pointer;
  outline-width: 5px;
  background-color: ${(props) =>
    props.$active ? props.theme.colors.grayscaleDivider : props.theme.colors.white};

  ${(props) =>
    props.$active &&
    `
  cursor: default;
  `}

  ${(props) =>
    !props.$active &&
    `
  &:hover {
    text-shadow: 0px 0px 0.5px ${props.theme.colors.grayscaleBlack};
  }
  `}
`;

export const NothingFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  margin: auto;
  color: #9fa2b4;
`;

export const TableWrapper = styled.div`
  overflow-y: auto;
  border-radius: ${THEME.border.radius.normal};
`;

export const StatsBlock = styled.div`
  padding-top: 5px;
  text-align: right;
  padding-right: 5px;
  color: ${({ theme }) => theme.colors.grayscaleGray};
`;
