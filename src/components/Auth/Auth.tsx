import { FC, useEffect, useState } from "react";
import { CONFIG_AUTH } from "./config";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { Form, Wrapper } from "./style";
import { useNotify } from "hooks/useNotify";
import { useCurrentPath } from "hooks/useCurrentPath";
import { useAuth } from "context/AuthContext";
import { PageType } from "types/authConfig";
import FormWrapper from "./FormWrapper";
import { Subtitle, Title } from "ui/Titles";
import Input from "common/Input";
import { MainButton } from "ui/Buttons";
import InlineLoader from "common/Loaders/InlineLoader/InlineLoader";
import ForgotPass from "./ForgotPass";
import LoginFooter from "./Footer";
import { transformErrorText } from "utils";

const Auth: FC = () => {
  // States
  const [apiError, setApiError] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const notify = useNotify();

  const navigate = useNavigate();

  const { addressPath } = useCurrentPath();

  // Obtaining user if he logged-in
  const { currentUser } = useAuth();

  const dataForRender: PageType = CONFIG_AUTH[addressPath];

  // Initializing react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm();

  // Lets clear error if we changed the route
  useEffect(() => {
    setApiError("");
  }, [addressPath]);

  // Displaying a toast if we receive error from auth API
  useEffect(() => {
    apiError && notify(transformErrorText(apiError));
  }, [apiError]);

  // Redirect if no such page found in Auth
  if (!dataForRender) return <Navigate to={"/auth/login"} />;
  // Redirect if User already logged-in
  if (currentUser && addressPath !== "resetpassword") return <Navigate to={"/dashboard"} />;

  // FORM SUBMIT HANDLER
  const onSubmit = async (data: Record<string, string>) => {
    setApiError("");
    // Lets check if provided passwords are equal (for sign-up and password reset cases)
    if (data.password2 && data.password1 !== data.password2)
      return setError(
        "password2",
        { type: "equal", message: "Passwords do not match" },
        { shouldFocus: true }
      );

    if (dataForRender.fireBaseMethod) {
      setIsLoading(true);

      dataForRender
        .fireBaseMethod(data)!
        .then(() => {
          // Lets Redirect user after success
          if (dataForRender.redirectLink) {
            // Displaying success message if it exists
            if (dataForRender?.successMessage) notify(dataForRender.successMessage, "success");
            navigate(dataForRender.redirectLink);
          }

          // Lets update state to display forgotpassword block
          if (addressPath === "forgotpassword") setResetEmailSent(true);

          // Lets reset Form after successful API request
          reset();
        })
        .catch((error) => {
          // Lets save error to State to display and to take appropriate actions
          setApiError(error.code);
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <Wrapper>
      <FormWrapper showEmailSent={resetEmailSent} resetEmailSent={setResetEmailSent}>
        <Title>{dataForRender?.title}</Title>
        <Subtitle>{dataForRender?.subtitle}</Subtitle>

        <Form onSubmit={handleSubmit(onSubmit)}>
          {dataForRender.inputs.map((input) => {
            return (
              <Input
                register={register}
                rules={input.validation}
                key={input.name}
                type={input.type}
                name={input.name}
                label={input.label}
                placeholder={input.placeholder}
                warningMsg={errors[input.name]?.message ? errors[input.name]?.message?.toString() : ""}
              />
            );
          })}

          <MainButton type="submit" disabled={isLoading}>
            {isLoading ? <InlineLoader /> : dataForRender.submitButtonLabel}
          </MainButton>

          <ForgotPass errorText={apiError} reset={reset} setApiError={setApiError} />
          {addressPath !== "signup" && <LoginFooter />}
        </Form>
      </FormWrapper>
    </Wrapper>
  );
};

export default Auth;
