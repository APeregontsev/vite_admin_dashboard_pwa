import { styled } from "styled-components";
import { THEME } from "theme/constants/constants";

interface SearchInputProps {
  $active?: boolean;
}

const StyledInput = styled.input`
  color: ${({ theme }) => theme.colors.inputText};
  height: 42px;
  width: 100%;
  padding: 11px 16px;
  border-radius: ${THEME.border.radius.normal};
  background-color: ${({ theme }) => theme.colors.grayscaleExtra_light};
  border: 1px solid ${({ theme }) => theme.colors.grayscaleLightest};

  &::placeholder {
    opacity: 0.4;
    letter-spacing: ${THEME.letterSpacing[3]};
  }

  &[type="file"] {
    &::file-selector-button {
      display: none;
    }
  }
`;

const SearchInput = styled(StyledInput)<SearchInputProps>`
  height: 30px;
  width: 0;
  min-width: 0;
  padding: 0;
  border: none;
  transition: width 0.3s, min-width 0.3s;

  ${(props) =>
    props.$active &&
    `
   width: 40%;
   min-width: 300px;
   padding: 0px 10px;
   border: 1px solid ${props.theme.colors.grayscaleLightest};

    @media (max-width: 1220px) {
     width: 100%;
     min-width: auto;
    }
   
  `}
`;

export { StyledInput, SearchInput };
