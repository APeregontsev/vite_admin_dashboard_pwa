import styled from "styled-components";
import { THEME } from "theme/constants/constants";

interface PriorityProps {
  $green?: boolean;
}

const Priority = styled.span<PriorityProps>`
  padding: 4px 12px;
  background-color: ${(props) => (props.$green ? props.theme.colors.green : props.theme.colors.red)};
  color: ${({ theme }) => theme.colors.hoverWhite};
  border-radius: 100px;
  text-transform: uppercase;
  font-size: ${THEME.size.small};
  cursor: default;
`;

export { Priority };
