import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogoutIconSVG, AvatarIconSVG } from "../Icons/headerIcons";
import { HeaderProfileWrapper, ProfileName, ProfileAvatar, AvatarContainer } from "./style";
import { useAuth } from "context/AuthContext";
import { useNotify } from "hooks/useNotify";

type HeaderProfileProps = {};

const HeaderProfile: FC<HeaderProfileProps> = ({}) => {
  // Getting info on logged-in User
  const { currentUser } = useAuth();

  const notify = useNotify();

  // Users' name to display
  const userName = currentUser?.displayName || "Unknown User";

  // Users' photo to display
  const userPhotoURL = currentUser?.photoURL || null;

  const navigate = useNavigate();
  const { logout } = useAuth();

  async function logOutHandler() {
    await logout();
    notify("You have successfully logged out!", "success");
    navigate("/auth/login");
  }

  return (
    <HeaderProfileWrapper>
      <LogoutIconSVG onClick={logOutHandler} />
      <ProfileName>{userName}</ProfileName>
      <Link to={"/dashboard/settings"}>
        <ProfileAvatar>
          <AvatarContainer>
            {userPhotoURL ? <img src={userPhotoURL} alt="User profile" /> : <AvatarIconSVG />}
          </AvatarContainer>
        </ProfileAvatar>
      </Link>
    </HeaderProfileWrapper>
  );
};

export default HeaderProfile;
