import { useAppSelector } from "store/store";
import { ADDConfigType } from "./type";

export const useAddConfig = () => {
  // Validation messages to display
  const INVALID_EMAIL_TEXT = "Invalid email";
  const INVALID_REQUIRED_TEXT = "Can't be empty";
  const ONLY_NUMBERS = "Only numbers accepted";
  const CHOOSE_VAL = "Choose value";

  // RegExp for validation cases
  const emailValidationRegExp = /^\S+@\S+\.\S+$/;
  const onlyNumberssRegExp = /^\d+$/;

  // Names of Inputs must === IDs of corresponding field in API
  // For placeholder in Select ==> selectedValue: "" && labelValue: "Choose completion" + validate notEmptyVal

  // Lets prepare data for Select
  const users = useAppSelector((state) => state.data.users);

  const userIdOptions: { label: string; value: string }[] = users.reduce((acc, user) => {
    const item = { label: String(user.id), value: String(user.id) };
    acc.push(item);

    return acc;
  }, [] as { label: string; value: string }[]);

  // Config

  const CONFIG_ADD: ADDConfigType = {
    todos: {
      title: "Add todos",
      inputs: [
        {
          inputType: "select",
          name: "userId",
          label: "User ID",
          placeholder: "User ID",
          options: userIdOptions,
          validation: {
            required: {
              value: true,
              message: CHOOSE_VAL,
            },
            validate: {
              notEmptyVal: (value: string) => value !== "" || CHOOSE_VAL,
            },
          },
          selectedValue: "",
          labelValue: "Choose User ID",
        },

        {
          inputType: "input",
          type: "text",
          name: "title",
          label: "Title",
          placeholder: "Title",
          validation: {
            required: {
              value: true,
              message: INVALID_REQUIRED_TEXT,
            },
          },
        },

        // SELECT !!!!!!!!!!!!!!!!!!!!!!!!!!

        {
          inputType: "select",
          name: "completed",
          label: "Completed",
          placeholder: "Completed",
          options: [
            { label: "True", value: "true" },
            { label: "False", value: "false" },
          ],
          validation: {
            required: {
              value: true,
              message: CHOOSE_VAL,
            },
            validate: {
              notEmptyVal: (value: string) => value !== "" || CHOOSE_VAL,
            },
          },
          selectedValue: "",
          labelValue: "Choose completion",
        },
      ],
    },

    photos: {
      title: "Add photos",
      inputs: [
        {
          inputType: "input",
          type: "number",
          name: "albumId",
          label: "Album ID",
          placeholder: "Album ID",
          validation: {
            pattern: { value: onlyNumberssRegExp, message: ONLY_NUMBERS },
            required: {
              value: true,
              message: INVALID_REQUIRED_TEXT,
            },
          },
        },
        {
          inputType: "input",
          type: "text",
          name: "title",
          label: "Title",
          placeholder: "Title",
          validation: {
            required: {
              value: true,
              message: INVALID_REQUIRED_TEXT,
            },
          },
        },

        {
          inputType: "input",
          type: "text",
          name: "url",
          label: "Photo URL",
          placeholder: "Photo URL",
          validation: {
            required: {
              value: true,
              message: INVALID_REQUIRED_TEXT,
            },
          },
        },

        {
          inputType: "input",
          type: "text",
          name: "thumbnailUrl",
          label: "Thumbnail URL",
          placeholder: "Thumbnail URL",
          validation: {
            required: {
              value: true,
              message: INVALID_REQUIRED_TEXT,
            },
          },
        },
      ],
    },
    posts: {
      title: "Add posts",
      inputs: [
        {
          inputType: "select",
          name: "userId",
          label: "User ID",
          placeholder: "User ID",
          options: userIdOptions,
          validation: {
            required: {
              value: true,
              message: CHOOSE_VAL,
            },
            validate: {
              notEmptyVal: (value: string) => value !== "" || CHOOSE_VAL,
            },
          },
          selectedValue: "",
          labelValue: "Choose User ID",
        },
        {
          inputType: "input",
          type: "text",
          name: "title",
          label: "Title",
          placeholder: "Title",
          validation: {
            required: {
              value: true,
              message: INVALID_REQUIRED_TEXT,
            },
          },
        },

        {
          inputType: "input",
          type: "text",
          name: "body",
          label: "Body",
          placeholder: "Body",
          validation: {
            required: {
              value: true,
              message: INVALID_REQUIRED_TEXT,
            },
          },
        },
      ],
    },
    comments: {
      title: "Add comments",
      inputs: [
        {
          inputType: "input",
          type: "number",
          name: "postId",
          label: "Post ID",
          placeholder: "Post ID",
          validation: {
            pattern: { value: onlyNumberssRegExp, message: ONLY_NUMBERS },
            required: {
              value: true,
              message: INVALID_REQUIRED_TEXT,
            },
          },
        },
        {
          inputType: "input",
          type: "text",
          name: "name",
          label: "Name",
          placeholder: "Name",
          validation: {
            required: {
              value: true,
              message: INVALID_REQUIRED_TEXT,
            },
          },
        },

        {
          inputType: "input",
          type: "text",
          name: "email",
          label: "Email",
          placeholder: "Email",
          validation: {
            pattern: { value: emailValidationRegExp, message: INVALID_EMAIL_TEXT },
            required: {
              value: true,
              message: INVALID_REQUIRED_TEXT,
            },
          },
        },

        {
          inputType: "input",
          type: "text",
          name: "body",
          label: "Body",
          placeholder: "Body",
          validation: {
            required: {
              value: true,
              message: INVALID_REQUIRED_TEXT,
            },
          },
        },
      ],
    },
    albums: {
      title: "Add album",
      inputs: [
        {
          inputType: "select",
          name: "userId",
          label: "User ID",
          placeholder: "User ID",
          options: userIdOptions,
          validation: {
            required: {
              value: true,
              message: CHOOSE_VAL,
            },
            validate: {
              notEmptyVal: (value: string) => value !== "" || CHOOSE_VAL,
            },
          },
          selectedValue: "",
          labelValue: "Choose User ID",
        },

        {
          inputType: "input",
          type: "text",
          name: "title",
          label: "Title",
          placeholder: "Title",
          validation: {
            required: {
              value: true,
              message: INVALID_REQUIRED_TEXT,
            },
          },
        },
      ],
    },
  };

  return CONFIG_ADD;
};
