import styled from "styled-components";
import { THEME } from "theme/constants/constants";

const FilterAppliedWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  border: 1px solid ${({ theme }) => theme.colors.grayscaleLight};
  padding: 4px 8px 4px 10px;
  border-radius: ${THEME.border.radius.normal};
  user-select: none;

  & svg {
    cursor: pointer;
    fill: ${({ theme }) => theme.colors.red};

    &:hover {
    }
  }
`;

const SpanSearch = styled.span`
  white-space: nowrap;
  font-weight: ${THEME.weight.bold};
  color: ${({ theme }) => theme.colors.red};
  user-select: text;
  max-width: 95px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const SpanColumn = styled.span`
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.grayscaleGray};
  font-size: 14px;
  font-style: normal;
  font-weight: ${THEME.weight.bold};
  line-height: normal;
  letter-spacing: 0.2px;
`;

export { FilterAppliedWrapper, SpanSearch, SpanColumn };
