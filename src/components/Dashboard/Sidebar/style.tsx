import styled from "styled-components";

export const Wrapper = styled.aside`
  background-color: ${({ theme }) => theme.colors.backgroundDark};
  min-width: 255px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  transition: transform 0.5s;

  @media (max-width: 1050px) {
    position: absolute;
    left: 0;
    z-index: 100;
    transform: ${({ theme }) => (theme.sidebar ? "translateX(0px)" : "translateX(-255px)")};
  }
`;

export const MenuDivider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.avatarLine};
  margin: 16px 0px;
  opacity: 0.06;
`;
