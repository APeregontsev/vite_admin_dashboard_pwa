import { StoryFn, Meta } from "@storybook/react";
import Button, { ButtonProps } from "./Button";

export default {
  title: "UI/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    /*  buttonType: {
      control: "radio",
      options: ["main", "cancel", "delete", "add"],
    },
    buttonSize: {
      control: "radio",
      options: ["normal", "medium"],
    },
    buttonWidth: {
      control: "radio",
      options: ["wide", "fixed"],
    }, */
    onClick: { action: "clicked" },
  },
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Main = Template.bind({});
Main.args = {
  buttonType: "main",
  children: "Main Button",
};

export const Cancel = Template.bind({});
Cancel.args = {
  buttonType: "cancel",
  children: "Cancel Button",
};

export const Delete = Template.bind({});
Delete.args = {
  buttonType: "delete",
  children: "Delete Button",
};
