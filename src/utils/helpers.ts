export interface IGetMaxShape {
  date: string;
  value: number;
}
/**
 * Given array of shape IGetMaxShape return the max value
 * @param arrayOfData 
 * @returns {number} - max value
 */
export const getMax = (arrayOfData: IGetMaxShape[]): number => {
  // Reduce array of values from IGetMaxShape[]
  const arrayOfValues: number[] = arrayOfData.reduce((acc: number[], item: IGetMaxShape) => {
    return acc.concat(item.value);
  }, []);

  //Get max number from array of values
  const maxValue = Math.max.apply(null, arrayOfValues);

  return maxValue;
};
