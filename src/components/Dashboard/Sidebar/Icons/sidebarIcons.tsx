import { StyledSVG } from "./style";

export const CloseSidebarSVG = ({ onClick }: { onClick?: () => void }) => {
  return (
    <StyledSVG xmlns="http://www.w3.org/2000/svg" height="25" width="25" onClick={onClick}>
      <g transform="translate(3.9661017,3.5677966)" id="imagebot_2">
        <path d="M -2.5783352e-4,-0.00146808 17.435473,18.212367" id="imagebot_5" />
        <path d="M -2.5783352e-4,18.212367 17.435473,-0.00146808" id="imagebot_4" />
      </g>
    </StyledSVG>
  );
};
