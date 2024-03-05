import { useState } from "react";
import { useForm } from "react-hook-form";
import { ActionInputContainer, ActionTitle, ActionWrapper, Form } from "./style";
import Input from "common/Input";
import InlineLoader from "common/Loaders/InlineLoader/InlineLoader";
import { useAuth } from "context/AuthContext";
import { setUserName } from "./../../../../firebase/firebase";
import { useNotify } from "hooks/useNotify";
import { SubmitButton } from "ui/Buttons";
import { userNameSuccess, userNameValidation } from "./config";

const UserNameForm = () => {
  const notify = useNotify();

  const [isLoading, setIsLoading] = useState(false);

  // Getting info on logged-in User
  const { currentUser, setUser } = useAuth();

  // Users' name to display
  const userName = currentUser?.displayName || "";

  // Initializing react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm();

  // FORM SUBMIT HANDLER

  const onUserNameSubmit = async (data: Record<string, string>) => {
    console.log("FORM", data);

    // Lets check if user has entered new userName
    if (data.userName === userName)
      return setError(
        "userName",
        { type: "changes", message: "No changes were made" },
        { shouldFocus: true }
      );

    setIsLoading(true);

    setUserName(data)
      .then(() => {
        // Displaying success message
        notify(userNameSuccess, "success");
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
      <ActionTitle>Change your username</ActionTitle>

      <ActionInputContainer>
        <Form onSubmit={handleSubmit(onUserNameSubmit)}>
          <Input
            register={register}
            rules={userNameValidation}
            key={"userName"}
            type={"text"}
            name={"userName"}
            label={"Enter your name"}
            placeholder={"Enter your name"}
            defaultValue={userName}
            warningMsg={errors.userName?.message ? errors.userName?.message?.toString() : ""}
          />

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? <InlineLoader /> : "Change name"}
          </SubmitButton>
        </Form>
      </ActionInputContainer>
    </ActionWrapper>
  );
};

export default UserNameForm;
