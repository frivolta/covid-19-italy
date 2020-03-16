// Types
export interface IApiData {
  confirmed: IApiDataItem[];
}

export interface IApiDataItem extends IPartialApiDataItem {
  ['Province/State']: string;
  ['Country/Region']: string;
  Lat: string;
  Long: string;
}

export interface INormalizedData {
  date: string;
  value: number;
}

export interface IPartialApiDataItem {
  [key: string]: string;
}

export interface IExtractConfirmedCases {
  (apiData: IApiData): IApiDataItem[];
}

export interface IGetCountryObject {
  (dataToFilter: IApiDataItem[], countryName: IApiDataItem['Province/State']): IApiDataItem;
}

export interface ICleanCountryObject {
  (countryObject: IApiDataItem, excludeZeroDays?: boolean): INormalizedData[];
}

// Functions

/**
 * Get data object, returns an array with confirmed cases
 * {confirmed: [{IApiDataItem}, ...]}
 * @param apiData
 * @returns confirmed cases
 */
export const extractConfirmedCases: IExtractConfirmedCases = apiData => apiData.confirmed;

/**
 * Filter array, returns the first item in the list
 * @description Filters all world confirmed cases, return only the one matching Country/Region
 * {[IApiData], ...} => {IApiData}
 * @param dataToFilter array of confirmed cases
 * @param countryName name of country to filter
 */
export const getCountryObject: IGetCountryObject = (dataToFilter, countryName) =>
  dataToFilter.filter(item => item['Country/Region'] === countryName)[0];

/**
 * Given a country obejct returns an array of INormalizedData
 * @param countryObject 
 * @param excludeZeroDays 
 * @returns array
 */
export const cleanCountryObject: ICleanCountryObject = (countryObject, excludeZeroDays) => {
  const propertyToExclude: Array<keyof IApiDataItem> = ['Province/State', 'Country/Region', 'Lat', 'Long'];
  const cleanedCountryObject = Object.keys(countryObject).reduce((acc: INormalizedData[], keyName) => {
    // Exclude propertyToExclude
    if (!propertyToExclude.includes(keyName)) {
      //Exclude zero days if excludeZeroDays
      if ((excludeZeroDays && parseInt(countryObject[keyName]) !== 0) || !excludeZeroDays)
        return acc.concat({ date: keyName, value: parseInt(countryObject[keyName]) });
    }
    return acc;
  }, []);
  return cleanedCountryObject;
};

// Reduce object
