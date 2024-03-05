import { forgotpassword, logIn, resetPassword, signUp } from "../../firebase/firebase";
import { AuthConfigType } from "../../types/authConfig";

// Validation messages to display
export const INVALID_EMAIL_TEXT = "Invalid email";
export const INVALID_REQUIRED_TEXT = "Can't be empty";
export const INVALID_FIRST_NAME_TEXT = "Invalid First name";
export const INVALID_LAST_NAME_TEXT = "Invalid Last name";
export const INVALID_LENGTH_6_TEXT = "Min length is 6";
export const AT_LEAST_ONE_DIGIT = "Must have at least 1 digit";
export const AT_LEAST_ONE_UPPER = "At least 1 uppercase needed";
export const AT_LEAST_ONE_LOWER = "At least 1 lowercase needed";
export const NO_WHITESPACES = "Whitespaces not allowed";

// RegExp for validation cases
export const atLeastOneUpperRegExp = /[A-Z]/;
export const atLeastOneLowerRegExp = /[a-z]/;
export const atLeastOneDigitRegExp = /\d/;
export const noWhitespacesRegExp = /^\S*$/;
export const emailValidationRegExp = /^\S+@\S+\.\S+$/;
export const onlyLettersRegExp = /^[A-Za-z]+$/i;

// Config
export const CONFIG_AUTH: AuthConfigType = {
  login: {
    title: "Log In to Dashboard Kit",
    subtitle: "Enter your email and password",
    inputs: [
      {
        type: "text",
        name: "email",
        label: "email",
        placeholder: "Email address",
        validation: {
          pattern: { value: emailValidationRegExp, message: INVALID_EMAIL_TEXT },
          required: {
            value: true,
            message: INVALID_REQUIRED_TEXT,
          },
        },
      },
      {
        type: "password",
        name: "password",
        label: "password",
        placeholder: "Password",
        validation: {
          required: {
            value: true,
            message: INVALID_REQUIRED_TEXT,
          },
          minLength: {
            value: 6,
            message: INVALID_LENGTH_6_TEXT,
          },
        },
      },
    ],
    submitButtonLabel: "Log In",
    redirectLink: "/dashboard/overview",
    successMessage: "You have successfully logged in!",
    fireBaseMethod: logIn,
  },

  signup: {
    title: "Sign Up",
    subtitle: "Create a new account",
    inputs: [
      {
        type: "text",
        name: "email",
        label: "email",
        placeholder: "Email address",
        validation: {
          pattern: { value: emailValidationRegExp, message: INVALID_EMAIL_TEXT },
          required: {
            value: true,
            message: INVALID_REQUIRED_TEXT,
          },
        },
      },
      {
        type: "text",
        name: "firstName",
        label: "First name",
        placeholder: "First name",
        validation: {
          pattern: { value: onlyLettersRegExp, message: INVALID_FIRST_NAME_TEXT },
          required: {
            value: true,
            message: INVALID_REQUIRED_TEXT,
          },
        },
      },
      {
        type: "text",
        name: "lastName",
        label: "Last name",
        placeholder: "Last name",
        validation: {
          pattern: { value: onlyLettersRegExp, message: INVALID_LAST_NAME_TEXT },
          required: {
            value: true,
            message: INVALID_REQUIRED_TEXT,
          },
        },
      },
      {
        type: "password",
        name: "password1",
        label: "password",
        placeholder: "Password",
        validation: {
          required: {
            value: true,
            message: INVALID_REQUIRED_TEXT,
          },
          minLength: {
            value: 6,
            message: INVALID_LENGTH_6_TEXT,
          },
          validate: {
            hasUpper: (value: string) => atLeastOneUpperRegExp.test(value) || AT_LEAST_ONE_UPPER,
            hasNumber: (value: string) => atLeastOneDigitRegExp.test(value) || AT_LEAST_ONE_DIGIT,
            hasLower: (value: string) => atLeastOneLowerRegExp.test(value) || AT_LEAST_ONE_LOWER,
            hasNoWhitespaces: (value: string) => noWhitespacesRegExp.test(value) || NO_WHITESPACES,
          },
        },
      },
      {
        type: "password",
        name: "password2",
        label: "confirm password",
        placeholder: "Password",
        validation: {
          required: {
            value: true,
            message: INVALID_REQUIRED_TEXT,
          },
        },
      },
    ],
    submitButtonLabel: "Register",
    fireBaseMethod: signUp,
  },

  forgotpassword: {
    title: "Forgot password?",
    subtitle: "Enter your email from registered account",
    inputs: [
      {
        type: "text",
        name: "email",
        label: "email",
        placeholder: "Email address",
        validation: {
          pattern: { value: emailValidationRegExp, message: INVALID_EMAIL_TEXT },
          required: {
            value: true,
            message: INVALID_REQUIRED_TEXT,
          },
        },
      },
    ],
    submitButtonLabel: "Send",
    fireBaseMethod: forgotpassword,
  },

  resetpassword: {
    title: "Reset Password",
    subtitle: "Enter new password",
    inputs: [
      {
        type: "password",
        name: "password1",
        label: "new password",
        placeholder: "Password",
        validation: {
          required: {
            value: true,
            message: INVALID_REQUIRED_TEXT,
          },
          minLength: {
            value: 6,
            message: INVALID_LENGTH_6_TEXT,
          },
          validate: {
            hasUpper: (value: string) => atLeastOneUpperRegExp.test(value) || AT_LEAST_ONE_UPPER,
            hasNumber: (value: string) => atLeastOneDigitRegExp.test(value) || AT_LEAST_ONE_DIGIT,
            hasLower: (value: string) => atLeastOneLowerRegExp.test(value) || AT_LEAST_ONE_LOWER,
            hasNoWhitespaces: (value: string) => noWhitespacesRegExp.test(value) || NO_WHITESPACES,
          },
        },
      },
      {
        type: "password",
        name: "password2",
        label: "confirm password",
        placeholder: "Password",
        validation: {
          required: {
            value: true,
            message: INVALID_REQUIRED_TEXT,
          },
          minLength: {
            value: 6,
            message: INVALID_LENGTH_6_TEXT,
          },
          validate: {
            hasUpper: (value: string) => atLeastOneUpperRegExp.test(value) || AT_LEAST_ONE_UPPER,
            hasNumber: (value: string) => atLeastOneDigitRegExp.test(value) || AT_LEAST_ONE_DIGIT,
            hasLower: (value: string) => atLeastOneLowerRegExp.test(value) || AT_LEAST_ONE_LOWER,
            hasNoWhitespaces: (value: string) => noWhitespacesRegExp.test(value) || NO_WHITESPACES,
          },
        },
      },
    ],
    submitButtonLabel: "Send",
    redirectLink: "/auth/login",
    successMessage: "Your password was successfully changed!",
    fireBaseMethod: resetPassword,
  },
};
