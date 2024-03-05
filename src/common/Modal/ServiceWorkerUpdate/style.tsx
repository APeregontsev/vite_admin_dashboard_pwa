import styled from "styled-components";
import { THEME } from "theme/constants/constants";

const UpdateWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const TextWrapper = styled.p`
  color: white;
  font-weight: ${THEME.weight.mid_bold};
`;

const RefreshSpan = styled.span`
  color: #a2c3f8;
  font-weight: ${THEME.weight.bold};
  margin: 0 10px;
  cursor: pointer;
  font-size: ${THEME.size.normal};
`;

const CloseSpan = styled.span`
  color: red;
  margin: 0 10px;
  cursor: pointer;
  font-size: ${THEME.size.normal};
`;

export { UpdateWrapper, RefreshSpan, TextWrapper, CloseSpan };
