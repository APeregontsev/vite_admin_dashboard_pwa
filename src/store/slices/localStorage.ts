// Saving data to localStorage
//-----------------------------------------------

export function useSaveData<DataType extends { id: number }>(key: string, data: DataType) {
  let dataInStorage: DataType[] = [];
  let currentEntryExist: number | undefined;
  let dataToSave: DataType[] = [];

  const updateLocalStorage = () => window.localStorage.setItem(key, JSON.stringify(dataToSave));

  // 1. Lets obtain data from localStorage
  const localData = window.localStorage.getItem(key);

  if (!localData) {
    // If no data found in localStorage -> immediately saving new data
    dataToSave.push(data);
    updateLocalStorage();
    return;
  } else {
    dataInStorage = JSON.parse(localData);
  }

  // 2. Lets check if current entry present in localStorage
  currentEntryExist = dataInStorage.findIndex((entry: DataType) => entry.id === data.id);

  if (currentEntryExist == undefined) {
    // 2.1. if new entry doesnt exist in localStorage
    // Lets save current entry to localStorage
    // + another entries saved in localStorage under our KEY

    dataToSave = [...dataInStorage];
    dataToSave.push(data);
    updateLocalStorage();
  } else {
    // 2.2. if new entry exists in localStorage
    // 2.3. Lets replace entry in localStorage with new entry that we need to save
    dataToSave = dataInStorage.filter((entry) => entry.id !== data.id);
    dataToSave.push(data);

    // Lets save current entry to localStorage
    // + another entries saved in localStorage under our KEY
    updateLocalStorage();
  }
}

// Retrieving and MERGING data from localStorage
//-----------------------------------------------

export function useMergeData<DataType extends { id: number }>(
  key: string,
  data: DataType[],
  entries?: number
) {
  let dataInStorage: DataType[] = [];
  let mergedData: DataType[] = [...data];

  // Lets put ID's of items in array for easier usage
  const dataIDS = data.map((entry) => entry.id);
  const minID = dataIDS.reduce((acc, item) => (acc > item ? item : acc));

  // 1. Lets obtain data from localStorage
  const localData = window.localStorage.getItem(key);

  if (!localData) {
    // If no data found in localStorage -> immediately returning Data
    return data;
  } else {
    dataInStorage = JSON.parse(localData);
  }

  // Lets loop through an array of found entries in localStorage and update mergedData

  dataInStorage.forEach((entry) => {
    if (!dataIDS.includes(entry.id) && entry.id >= minID) {
      // If we haven't found ID of item stored in localStorage -> its NEW item -> lets add it to mergedData
      mergedData.push(entry);
    } else {
      // If we found ID of item stored in localStorage -> its EDITED item -> lets replace with it item in mergedData

      // Lets check if item from localStorage has smaller ID than in data from api, if so -> lets skip it
      if (entry.id >= minID) {
        mergedData = mergedData.filter((item) => item.id !== entry.id);
        mergedData.push(entry);
      }
    }
  });

  // Lets return mergedData

  // If we have "entries" - its mean that we load paged data, so we need to slice extra entries
  if (entries) return mergedData.sort((a, b) => a.id - b.id).slice(0, entries);

  return mergedData.sort((a, b) => a.id - b.id);
}
