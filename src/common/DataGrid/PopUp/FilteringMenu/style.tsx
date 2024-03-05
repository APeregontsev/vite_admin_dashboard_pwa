import styled from "styled-components";
import { THEME } from "../../../../theme/constants/constants";

const PopupMenuWrapper = styled.div`
  display: flex;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.popupBackground};
  padding: 12px;
  top: 140%;
  left: 0%;
  z-index: 10;
  border-radius: ${THEME.border.radius.normal};
  width: 500px;
  flex-direction: column;

  @media (max-width: 670px) {
    width: 265px;
  }
`;

const FormFilter = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px;
  width: 100%;
  gap: 20px;

  @media (max-width: 670px) {
    flex-direction: column;
  }
`;

export { PopupMenuWrapper, FormFilter };
