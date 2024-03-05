import { capitalizeFirstLetter } from "utils";

type SuccessMessageProps<DataRow> = {
  item?: DataRow;
  type: string;
  action: "Delete" | "Add " | "Edit ";
};

const SuccessMessage = <DataRow extends Record<string, any>>({
  item,
  type,
  action,
}: SuccessMessageProps<DataRow>): JSX.Element => {
  // Success message
  const successTitle: string | undefined = item?.title || item?.name;
  const itemType = capitalizeFirstLetter(type);

  function removeLastS(string: string) {
    if (string && string.length > 0 && string.charAt(string.length - 1) == "s") {
      string = string.substring(0, string.length - 1);
    }
    return string;
  }

  // Success action name
  const actionType = action === "Delete" ? "deleted" : action === "Add " ? "added" : "modified";

  return (
    <div>
      {removeLastS(itemType)} <b>{successTitle}</b> was successfuly {actionType}!
    </div>
  );
};

export default SuccessMessage;

// Function for getting text out of JSX Component

export function formMessage<DataRow extends Record<string, any>>({
  type,
  action,
  item,
}: {
  type: string;
  action: "Delete" | "Add " | "Edit ";
  item?: DataRow;
}): string {
  // Success message
  const successTitle: string | undefined = item?.title || item?.name;
  const itemType = capitalizeFirstLetter(type);

  function removeLastS(string: string) {
    if (string && string.length > 0 && string.charAt(string.length - 1) == "s") {
      string = string.substring(0, string.length - 1);
    }
    return string;
  }

  // Success action name
  const actionType = action === "Delete" ? "deleted" : action === "Add " ? "added" : "modified";

  return `${removeLastS(itemType)} ${successTitle} was successfuly ${actionType}! `;
}
