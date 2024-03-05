import { Priority } from "./style";

const PriorityHighlight = ({ text }: { text: string }): JSX.Element => {
  const green = text === "true";

  return <Priority $green={green}>{text}</Priority>;
};

export default PriorityHighlight;
