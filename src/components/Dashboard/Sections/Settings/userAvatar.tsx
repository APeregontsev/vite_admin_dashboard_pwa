import { useState } from "react";
import { useForm } from "react-hook-form";
import isURL from "validator/lib/isURL";
import { ActionInputContainer, ActionTitle, ActionWrapper, Form } from "./style";
import Input from "common/Input";
import InlineLoader from "common/Loaders/InlineLoader/InlineLoader";
import { INVALID_REQUIRED_TEXT } from "components/Auth/config";
import { SubmitButton } from "ui/Buttons";
import { setUserAvatar } from "./../../../../firebase/firebase";
import { useNotify } from "hooks/useNotify";
import { userAvatarSuccess } from "./config";
import { useAuth } from "context/AuthContext";

const UserAvatarForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const notify = useNotify();
  // Getting info on logged-in User
  const { setUser } = useAuth();

  // Initializing react-hook-form
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm();

  // FORM SUBMIT HANDLER

  const onAvatarSubmit = async (data: Record<string, string>) => {
    // Lets check if provided value is valid URL

    if (!isURL(data.userAvatar))
      return setError("userAvatar", { type: "notURL", message: "Not valid URL" }, { shouldFocus: true });

    setIsLoading(true);

    setUserAvatar(data as { userAvatar: string })
      .then(() => {
        // Displaying success message
        notify(userAvatarSuccess, "success");
        // Lets reset Form after successful API request
        reset();
        setUser();
      })
      .catch((error) => {
        notify(error.code);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <ActionWrapper>
      <ActionTitle>Change your profile photo</ActionTitle>

      <ActionInputContainer>
        <Form onSubmit={handleSubmit(onAvatarSubmit)}>
          <Input
            register={register}
            rules={{
              required: {
                value: true,
                message: INVALID_REQUIRED_TEXT,
              },
            }}
            key={"userAvatar"}
            type={"text"}
            name={"userAvatar"}
            label={"Add link to your photo"}
            placeholder={"Add link to your photo"}
            warningMsg={errors.userAvatar?.message ? errors.userAvatar?.message?.toString() : ""}
          />

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? <InlineLoader /> : "Upload avatar"}
          </SubmitButton>
        </Form>
      </ActionInputContainer>
    </ActionWrapper>
  );
};

export default UserAvatarForm;
