import React from "react";

const MarkedString = ({ dataToMark, searchData }: { dataToMark: string | number; searchData: string }) => {
  if (!searchData) return <>{dataToMark}</>;

  let stringToMark;

  if (typeof dataToMark !== "number") {
    stringToMark = dataToMark;
  } else {
    stringToMark = dataToMark.toString();
  }

  const searchQuery = searchData.toLowerCase();

  const nothingFound = stringToMark.toLowerCase().search(searchQuery);
  if (nothingFound === -1) {
    return <>{dataToMark}</>;
  }

  const renderArray: any[] = [];
  const queryLength = searchQuery.length;

  recursionSearch(stringToMark);

  function recursionSearch(string: string) {
    const foundPosition = string.toLowerCase().search(searchQuery);

    if (foundPosition === -1) {
      renderArray.push(string);
      return;
    }

    const preFoundPart = string.slice(0, foundPosition);
    const FoundPart = string.slice(foundPosition, foundPosition + queryLength);
    const postFoundPart = string.slice(foundPosition + queryLength);

    if (preFoundPart) renderArray.push(preFoundPart);
    renderArray.push(FoundPart);
    if (postFoundPart) recursionSearch(postFoundPart);
  }

  return (
    <>
      {renderArray.map((stringPart, index) => {
        if (stringPart.toLowerCase() !== searchQuery)
          return <React.Fragment key={stringPart + index}>{stringPart}</React.Fragment>;
        return <mark key={stringPart + index}>{stringPart}</mark>;
      })}
    </>
  );
};

export default MarkedString;
