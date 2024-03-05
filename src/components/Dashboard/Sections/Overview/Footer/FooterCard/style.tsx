import styled from "styled-components";
import { THEME } from "../../../../../../theme/constants/constants";

const CardWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${THEME.border.radius.normal};
  width: 50%;
  height: 236px;
  border: 1px solid ${({ theme }) => theme.colors.grayscaleDivider};
  overflow: hidden;

  @media (max-width: 950px) {
    height: auto;
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const CardHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 24px;

  @media (max-width: 950px) {
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
  }

  @media (max-width: 700px) {
    flex-direction: row;
    align-items: center;
  }
`;

const CardTitleWrapper = styled.div`
  flex-grow: 1;
`;

const CardTitle = styled.h2`
  color: ${({ theme }) => theme.colors.digitColor};
  font-size: ${THEME.size.normalBig};
  font-weight: ${THEME.weight.bold};
  letter-spacing: ${THEME.letterSpacing[4]};
  margin-bottom: 8px;
`;

const CardSubTitle = styled.h3`
  color: ${({ theme }) => theme.colors.subGray};
  font-size: ${THEME.size.small};
  font-weight: ${THEME.weight.normal};
  line-height: 16px;
  letter-spacing: ${THEME.letterSpacing[2]};

  @media (max-width: 950px) {
    margin-bottom: 10px;
  }
`;

const CardDetailsWrapper = styled.div``;

const CardBody = styled.div``;

const CardItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayscaleDivider};

  &:last-child {
    border-bottom: none;
  }
`;

const DetailsText = styled.span`
  color: ${({ theme }) => theme.colors.mainBlue};
  text-align: right;
  font-weight: ${THEME.weight.mid_bold};
  line-height: 20px;
  letter-spacing: ${THEME.letterSpacing[2]};
  cursor: pointer;
`;

const CardItemText = styled.div`
  flex-grow: 1;
  color: ${({ theme }) => theme.colors.digitColor};
  font-weight: ${THEME.weight.mid_bold};
  line-height: 20px;
  letter-spacing: ${THEME.letterSpacing[2]};
  padding-right: 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 200px;
`;

const CardItemStat = styled.div`
  color: ${({ theme }) => theme.colors.grayscaleGray};
  text-align: right;
  font-weight: ${THEME.weight.mid_bold};
  line-height: 20px;
  letter-spacing: ${THEME.letterSpacing[2]};
`;

export {
  CardWrapper,
  CardHeaderWrapper,
  CardTitleWrapper,
  CardTitle,
  CardSubTitle,
  CardDetailsWrapper,
  CardBody,
  CardItemWrapper,
  DetailsText,
  CardItemText,
  CardItemStat,
};
