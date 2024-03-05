import styled from "styled-components";
import { THEME } from "theme/constants/constants";

const DiagramWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 99%;
  width: 0;
  flex-grow: 1;
  padding: 24px;
  border-top-left-radius: ${THEME.border.radius.normal};
  border-bottom-left-radius: ${THEME.border.radius.normal};

  @media (max-width: 750px) {
    width: 99%;
    min-height: 420px;
  }
`;

const DiagramContainer = styled.div`
  position: relative;
  height: 99%;
`;

const DiagramTitleWrapper = styled.div`
  @media (max-width: 530px) {
    height: 115px;
  }
`;

const DiagramTitle = styled.div`
  color: ${({ theme }) => theme.colors.digitColor};
  font-size: ${THEME.size.normalBig};
  font-weight: ${THEME.weight.bold};
  letter-spacing: ${THEME.letterSpacing[4]};
  padding-bottom: 8px;
`;

const DiagramSubTitle = styled.div`
  color: ${({ theme }) => theme.colors.subGray};
  font-size: ${THEME.size.small};
  font-weight: ${THEME.weight.normal};
  line-height: 16px;
  letter-spacing: ${THEME.letterSpacing[2]};
`;

const CustomTooltipStyle = styled.div`
  color: ${({ theme }) => theme.colors.popupBlack};
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 7px;
  width: 74px;
  height: 46px;
  transform: translate(-45px, -70px);
  background: url("./../../../../img/chart_tooltip.svg") 0 0 / contain no-repeat;
`;

const RenderColorLegend = styled.span`
  color: ${({ theme }) => theme.colors.grayscaleGray};
`;

const CustomTick = styled.text`
  fill: ${({ theme }) => theme.colors.grayscaleGray};
  font-size: ${THEME.size.small};
`;

export {
  DiagramContainer,
  DiagramWrapper,
  DiagramTitleWrapper,
  DiagramTitle,
  DiagramSubTitle,
  CustomTooltipStyle,
  RenderColorLegend,
  CustomTick,
};
