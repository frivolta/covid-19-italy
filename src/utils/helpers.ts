import { INormalizedData } from './data-normalize.helper';

/**
 * Given array of shape IGetMaxShape return the max value
 * @param arrayOfData 
 * @returns {number} - max value
 */
export const getMax = (arrayOfData: INormalizedData[]): number => {
  const arrayOfValues: number[] = arrayOfData.reduce((acc: number[], item: INormalizedData) => {
    return acc.concat(item.value);
  }, []);
  const maxValue = Math.max.apply(null, arrayOfValues);

  return maxValue;
};
