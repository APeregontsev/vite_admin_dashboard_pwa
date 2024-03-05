import { useState } from "react";
import { useForm } from "react-hook-form";
import { ActionInputContainer, ActionTitle, ActionWrapper, Form, InnerForm } from "./style";
import Input from "common/Input";
import InlineLoader from "common/Loaders/InlineLoader/InlineLoader";
import { resetPassword } from "./../../../../firebase/firebase";
import { useNotify } from "hooks/useNotify";
import { SubmitButton } from "ui/Buttons";
import { passwordSuccess, passwordValidation } from "./config";

const UserPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const notify = useNotify();

  // Initializing react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  // FORM SUBMIT HANDLER

  const onPasswordSubmit = async (data: Record<string, string>) => {
    // Lets check if provided passwords are equal (for sign-up and password reset cases)
    if (data.password2 && data.password1 !== data.password2)
      return setError(
        "password2",
        { type: "equal", message: "Passwords do not match" },
        { shouldFocus: true }
      );

    setIsLoading(true);

    resetPassword(data)
      .then(() => {
        // Displaying success message
        notify(passwordSuccess, "success");
        // Lets reset Form after successful API request
        reset();
      })
      .catch((error) => {
        notify(error.code);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <ActionWrapper>
      <ActionTitle>Change your password</ActionTitle>

      <ActionInputContainer>
        <Form onSubmit={handleSubmit(onPasswordSubmit)}>
          <InnerForm>
            <Input
              register={register}
              rules={passwordValidation}
              key={"password1"}
              type={"password"}
              name={"password1"}
              label={"New password"}
              placeholder={"Enter new password"}
              warningMsg={errors.password1?.message ? errors.password1?.message?.toString() : ""}
            />

            <Input
              register={register}
              rules={passwordValidation}
              key={"password2"}
              type={"password"}
              name={"password2"}
              label={"Confirm password"}
              placeholder={"Confirm password"}
              warningMsg={errors.password2?.message ? errors.password2?.message?.toString() : ""}
            />
          </InnerForm>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? <InlineLoader /> : "Change password"}
          </SubmitButton>
        </Form>
      </ActionInputContainer>
    </ActionWrapper>
  );
};

export default UserPasswordForm;
