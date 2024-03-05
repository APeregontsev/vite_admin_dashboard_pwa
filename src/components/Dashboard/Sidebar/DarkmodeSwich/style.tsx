import styled from "styled-components";
import { THEME } from "theme/constants/constants";

const FooterSwitch = styled.div`
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  height: 48px;
  border-radius: ${THEME.border.radius.normal};
  width: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #42434dc2;
  gap: 30px;
`;

const Dayswitch = styled.div``;
const Nightswitch = styled.div``;

export { FooterSwitch, Dayswitch, Nightswitch };
