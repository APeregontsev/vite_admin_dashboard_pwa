import styled from "styled-components";
import { THEME } from "../../../../../theme/constants/constants";

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;

  @media (max-width: 700px) {
    flex-wrap: wrap;
    gap: 10px;
  }
`;

const BlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${THEME.border.radius.normal};
  width: 25%;
  height: 100px;
  padding: 12px 24px;
  border: 1px solid ${({ theme }) => theme.colors.grayscaleDivider};

  @media (max-width: 760px) {
    height: auto;
  }

  @media (max-width: 700px) {
    width: calc((100% - 10px) / 2);
  }
`;

const BlockTitle = styled.div`
  color: ${({ theme }) => theme.colors.grayscaleGray};
  text-align: center;
  font-size: ${THEME.size.normalBig};
  font-weight: ${THEME.weight.bold};
  letter-spacing: ${THEME.letterSpacing[4]};

  @media (max-width: 760px) {
    font-size: ${THEME.size.normal};
  }
`;

const BlockDigit = styled.div`
  color: ${({ theme }) => theme.colors.digitColor};
  text-align: center;
  font-size: ${THEME.size.xLarge};
  font-weight: ${THEME.weight.bold};
  letter-spacing: 1px;

  @media (max-width: 750px) {
    font-size: ${THEME.size.large};
  }
`;

export { HeaderWrapper, BlockContainer, BlockTitle, BlockDigit };
