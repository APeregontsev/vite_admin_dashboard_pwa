import { styled } from "styled-components";
import { THEME } from "theme/constants/constants";

interface CancelBtnProps {
  $confirm?: boolean;
}

const MainButton = styled.button`
  height: 48px;
  background-color: ${({ theme }) => theme.colors.mainBlue};
  color: ${({ theme }) => theme.colors.hoverWhite};
  border-radius: ${THEME.border.radius.normal};
  font-weight: ${THEME.weight.mid_bold};
  letter-spacing: ${THEME.letterSpacing[2]};
  width: 100%;
  line-height: 20px;
  text-align: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.mainBlueHover};
  }
`;

const CancelButton = styled(MainButton)<CancelBtnProps>`
  background-color: ${({ theme }) => theme.colors.hoverWhite};
  color: ${({ theme }) => theme.colors.mainBlue};
  width: ${(props) => (props.$confirm ? "50%" : "100%")};
  height: ${(props) => (props.$confirm ? "42px" : "48px")};

  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverWhite};
    font-weight: ${THEME.weight.bold};
  }
`;

const AddButton = styled(MainButton)`
  background-color: ${({ theme }) => theme.colors.addButton};
  color: ${({ theme }) => theme.colors.addButtonText};
  width: 115px;

  &:hover {
    font-weight: ${THEME.weight.bold};
    background-color: ${({ theme }) => theme.colors.addButton};
  }
`;

const SubmitButton = styled(MainButton)`
  height: 42px;
  max-width: 145px;
`;

const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    & path {
      stroke: ${({ theme }) => theme.colors.backgroundDark};
    }
  }

  &:disabled {
    cursor: default;
    & path {
      stroke: ${({ theme }) => theme.colors.disabledArrow};
    }
  }
`;

const FilterButton = styled(MainButton)`
  height: 42px;
  width: auto;
  padding: 0 20px;
  margin-top: 21px;
`;

const DeleteButton = styled(MainButton)`
  height: 42px;
  width: 50%;
  padding: 0 20px;
  margin-top: 0px;
  background-color: #f12b2cb0;

  &:hover {
    font-weight: ${THEME.weight.bold};
    background-color: ${({ theme }) => theme.colors.red};
  }
`;

export { MainButton, CancelButton, AddButton, ArrowButton, FilterButton, DeleteButton, SubmitButton };
