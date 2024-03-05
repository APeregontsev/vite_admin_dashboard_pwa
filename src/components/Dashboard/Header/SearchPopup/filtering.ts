// Filter function

type FilteredDataItem = { key: string; data: any[] };

export function filterData(data: Record<string, Array<any>>, searchQuery: string) {
  const result: FilteredDataItem[] = [];

  // Search callback
  function searchCallback(item: Record<string, any>) {
    for (const key in item) {
      // Lets exclude TimeStamp from filtering
      if (key === "modified") continue;

      // If key in analyzed object is OBJECT
      if (typeof item[key] === "object") {
        const objectToString = JSON.stringify(item[key]);
        if (objectToString.toLowerCase().includes(searchQuery.toLowerCase())) return true;
      }

      // For other cases
      if (item[key].toString().toLowerCase().includes(searchQuery.toLowerCase())) return true;
    }
  }

  for (const property in data) {
    const filteredItem: FilteredDataItem = { key: "", data: [] };

    filteredItem.key = property;

    const filteredDataItem = data[property].filter(searchCallback);

    filteredItem.data = filteredDataItem;

    // Lets push only that keys that have found items in []
    if (filteredDataItem.length) result.push(filteredItem);
  }

  return result;
}
