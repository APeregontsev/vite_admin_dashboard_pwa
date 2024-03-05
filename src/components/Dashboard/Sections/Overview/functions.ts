// Lets form data to build the chart: lets count completed/ not-completed TODOS with defined Interval
// and build defined structure

export function formData<DataType extends { completed: boolean }>(data: DataType[], interval: number) {
  let periodsTotal = Math.ceil(data.length / interval);
  const formedData: { name: number; Completed: number; ["In progress"]: number }[] = [];

  let sliceFrom = 0;

  while (periodsTotal > 0) {
    const currentRange = data.slice(sliceFrom * interval, sliceFrom * interval + interval);

    let Completed = 0;
    let Failed = 0;

    currentRange.forEach((item) => {
      item.completed === true ? Completed++ : Failed++;
    });

    formedData.push({ name: sliceFrom + 1, Completed, ["In progress"]: Failed });

    sliceFrom++;
    periodsTotal--;
  }

  return formedData;
}

// Function for selection TODOs and returning in format fot further rendering in Footer Block

export function lastCompletedTodos<DataType extends { completed: boolean; title: string; modified?: number }>(
  data: DataType[]
) {
  const sortedData = [...data].sort((a, b) => {
    const valueA = a.modified || Number.MIN_VALUE;
    const valueB = b.modified || Number.MIN_VALUE;

    return valueA - valueB;
  });

  const result = sortedData.reduceRight((acc, item) => {
    if (item.completed && acc.length < 3) {
      const dataItem = { name: item.title, complete: item.completed };
      acc.push(dataItem);
      return acc;
    }
    return acc;
  }, [] as { name: string; complete: boolean }[]);

  return result;
}

export function lastAddedTodos<DataType extends { completed: boolean; title: string }>(data: DataType[]) {
  const result = data.reduceRight((acc, item) => {
    if (acc.length < 3) {
      const dataItem = { name: item.title, complete: item.completed };
      acc.push(dataItem);
      return acc;
    }
    return acc;
  }, [] as { name: string; complete: boolean }[]);

  return result;
}
