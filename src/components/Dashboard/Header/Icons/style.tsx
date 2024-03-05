import styled from "styled-components";

export const StyledSVG = styled.svg`
  cursor: pointer;
  stroke: ${({ theme }) => theme.colors.grayscaleGray};

  & .notification {
    fill: ${({ theme }) => theme.colors.grayscaleGray};
  }

  &:hover {
    stroke: ${({ theme }) => theme.colors.svgHover};

    & .notification {
      fill: ${({ theme }) => theme.colors.svgHover};
    }

    & .logout {
      stroke: ${({ theme }) => theme.colors.red};
    }
  }
`;

export const ShowSidebarSVG = styled.svg`
  cursor: pointer;
  display: none;

  & path {
    fill: ${({ theme }) => theme.colors.grayscaleBlack};
  }

  &:hover {
    & path {
      fill: ${({ theme }) => theme.colors.red};
    }
  }

  @media (max-width: 1050px) {
    display: block;
  }
`;

export const StyledSVGAvatar = styled.svg`
  & path {
    fill: ${({ theme }) => theme.colors.avatarBG};
  }
`;

export const StyledSpinnerSVG = styled.svg`
  stroke: ${({ theme }) => theme.colors.grayscaleGray};
  fill: ${({ theme }) => theme.colors.grayscaleGray};
  animation: spin 1s infinite linear;

  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;
