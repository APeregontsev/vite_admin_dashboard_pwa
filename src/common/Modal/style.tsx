import styled from "styled-components";
import { THEME } from "theme/constants/constants";

export const LogoTitle = styled.div`
  color: ${({ theme }) => theme.colors.grayscaleSidebar};
  font-size: ${THEME.size.normalBig};
  font-weight: ${THEME.weight.bold};
  letter-spacing: ${THEME.letterSpacing[4]};
  line-height: normal;
  opacity: 0.7;
`;

interface ModalProps {
  $sw_update?: boolean;
}

const ModalWrapper = styled.div<ModalProps>`
  position: fixed;

  ${(props) =>
    !props.$sw_update
      ? `
      top: 0; 
      right: 0;  
      bottom: 0;
      left: 0;
      background-color: rgba(54, 55, 64, 0.5);`
      : `
      bottom: 0;
      left: 0; 
      right: 0; 
      padding: 10px;
      background-color: rgba(54, 55, 64, 0.3);`}

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div<ModalProps>`
  background-color: ${(props) => (props.$sw_update ? "#474851" : props.theme.colors.white)};
  width: ${(props) => (!props.$sw_update ? "380px" : null)};
  height: auto;
  padding: 32px;
  border-radius: ${THEME.border.radius.normal};
`;

const ModalTitle = styled.div`
  margin-top: 32px;
`;

export { ModalWrapper, ModalContent, ModalTitle };
