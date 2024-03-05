import { styled } from "styled-components";
import { THEME } from "theme/constants/constants";

interface TitleProps {
  $header?: boolean;
  $caution?: boolean;
  $add?: boolean;
}

interface SubTitleProps {
  $alignLeft?: boolean;
}

interface InputTitleProps {
  $popup?: boolean;
}

const Title = styled.h1<TitleProps>`
  font-size: ${THEME.size.large};
  font-weight: ${THEME.weight.bold};
  color: ${(props) => (props.$caution ? props.theme.colors.red : props.theme.colors.grayscaleBlack)};
  letter-spacing: ${THEME.letterSpacing[3]};
  text-align: ${(props) => (props.$header ? "left" : "center")};
  margin-bottom: ${(props) => (props.$header ? "0px" : props.$add ? "48px" : "12px")};
  flex-grow: ${(props) => (props.$header ? 1 : 0)};
`;

const Subtitle = styled.h2<SubTitleProps>`
  font-weight: ${THEME.weight.normal};
  color: ${({ theme }) => theme.colors.grayscaleGray};
  text-align: ${(props) => (props.$alignLeft ? "left" : "center")};
  line-height: 20px;
  letter-spacing: ${THEME.letterSpacing[3]};
`;

const InputTitle = styled.label<InputTitleProps>`
  color: ${(props) => (props.$popup ? props.theme.colors.popLabel : props.theme.colors.grayscaleGray)};
  letter-spacing: ${THEME.letterSpacing[3]};
  font-weight: ${THEME.weight.bold};
  text-transform: uppercase;
  font-size: ${THEME.size.small};
  line-height: normal;
  margin-bottom: 6px;
  display: block;
`;

export { Title, Subtitle, InputTitle };
