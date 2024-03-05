import styled from "styled-components";
import { THEME } from "theme/constants/constants";

export const HeaderProfileWrapper = styled.div`
  padding-left: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ProfileName = styled.div`
  margin-left: 32px;
  margin-right: 14px;
  font-weight: ${THEME.weight.mid_bold};
  width: max-content;
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 700px) {
    width: auto;
  }
`;

export const ProfileAvatar = styled.div`
  min-width: 44px;
  min-height: 44px;
  border: 2px solid ${({ theme }) => theme.colors.avatarBorder};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  & img,
  svg {
    padding: 2px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export const AvatarContainer = styled.div`
  padding: 2px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;
