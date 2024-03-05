import { format } from "date-fns";
import { errorsMapping } from "./firebase/errorsMapping";

export const capitalizeFirstLetter = (string: string) => string[0].toUpperCase() + string.slice(1);

export const transformErrorText = (firebaseError: string) => {
  switch (firebaseError) {
    case errorsMapping.wrongPassword.firebaseErr:
      return errorsMapping.wrongPassword.text;

    case errorsMapping.wrongEmail.firebaseErr:
      return errorsMapping.wrongEmail.text;

    case errorsMapping.emailInUse.firebaseErr:
      return errorsMapping.emailInUse.text;

    case errorsMapping.needLogin.firebaseErr:
      return errorsMapping.needLogin.text;

    case errorsMapping.tooManyRequests.firebaseErr:
      return errorsMapping.tooManyRequests.text;

    default:
      return firebaseError;
  }
};

// For pagination: calculation of possible number of pages
export const getPagesCount = (totalCount: number, limit: number) => {
  return Math.ceil(totalCount / limit);
};

// For transforming "true"/"false" from strings => booleans
export function transformBooleans(item: any) {
  for (const field in item) {
    if (item[field] === "true") {
      item[field] = true;
    } else if (item[field] === "false") {
      item[field] = false;
    }
  }
}

// Format current Date to "25 May 2019, 09:41 PM" -- default en-US locale

export function dateFormat(date: Date): string {
  return format(date, "d LLL yyyy, hh:mm a");
}

// Transform object values to a string for further display as text

export function objectToString(object: any) {
  const result: string[] = [];

  for (const key in object) {
    const element = object[key];

    if (typeof element !== "object") {
      // Lets push _key as string
      result.push(key + ": ");
      // Lets push _value as string
      result.push(element.replaceAll(`"`, "") + ", ");
    } else {
      // Lets push _key as a sting
      result.push(key + " >> ");
      result.push(objectToString(element));
    }
  }

  let finalString = result.join("");

  return finalString.slice(0, finalString.length - 2);
}
