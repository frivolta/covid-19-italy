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

export interface IPartialApiDataItem {
  [key: string]: string;
}

export interface IExtractConfirmedCases {
  (apiData: IApiData): IApiDataItem[];
}

export interface IGetCountryObject {
  (dataToFilter: IApiDataItem[], countryName: IApiDataItem['Province/State']): IApiDataItem;
}

// Constants
const propertyToExclude: Array<keyof IApiDataItem> = ['Province/State', 'Country/Region', 'Lat', 'Long'];

// Functions

/**
 * Get data object, returns an array with confirmed cases
 * {confirmed: [{IApiDataItem}, ...]}
 * @param apiData
 * @returns confirmed cases
 */
export const extractConfirmedCases: IExtractConfirmedCases = apiData => apiData.confirmed;

// const filteredData = dataArray.filter((item: any) => item[propertyToFilter] === filterName);

/**
 * Filter array, returns the first item in the list
 * @description Filters all world confirmed cases, return only the one matching Country/Region
 * {[IApiData], ...} => [IApiData]
 * @param dataToFilter array of confirmed cases
 * @param countryName name of country to filter
 */
export const getCountryObject: IGetCountryObject = (dataToFilter, countryName) =>
  dataToFilter.filter(item => item['Country/Region'] === countryName)[0];

// Exclude propertyToExclude from object
// Reduce object
