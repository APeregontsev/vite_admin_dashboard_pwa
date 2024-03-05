import styled from "styled-components";

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background: ${({ theme }) => theme.colors.backgroundLight};

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export { FooterWrapper };
