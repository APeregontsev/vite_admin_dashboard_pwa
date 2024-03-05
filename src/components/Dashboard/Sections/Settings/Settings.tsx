import { Wrapper } from "./style";
import UserAvatarForm from "./userAvatar";
import UserNameForm from "./userName";
import UserPasswordForm from "./userPassword";

const Settings = () => {
  return (
    <Wrapper>
      <UserNameForm />
      <UserPasswordForm />
      <UserAvatarForm />
    </Wrapper>
  );
};

export default Settings;
