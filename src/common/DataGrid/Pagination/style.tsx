import styled from "styled-components";
import { THEME } from "theme/constants/constants";

const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 24px;
  gap: 48px;
  color: ${({ theme }) => theme.colors.grayscaleGray};
  font-weight: ${THEME.weight.normal};
  line-height: 20px;
  letter-spacing: ${THEME.letterSpacing[3]};

  @media (max-width: 470px) {
    flex-direction: column;
    align-items: flex-end;
    gap: 15px;
  }
`;

const SelectRowsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const DisplayRowsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const SelectPageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;

  & svg {
    & path {
      stroke: ${({ theme }) => theme.colors.grayscaleGray};
    }
  }
`;

const SelectWrapper = styled.div`
  max-width: 50px;
`;

export { PaginationWrapper, SelectRowsWrapper, DisplayRowsWrapper, SelectPageWrapper, SelectWrapper };
