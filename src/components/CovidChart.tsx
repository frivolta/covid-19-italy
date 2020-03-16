import * as React from 'react';
import {getMax} from '../utils/helpers'
import {  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { useFetch } from '../hooks/useFetch';
import { endpoints } from '../config/api-endpoint';
import { extractConfirmedCases, getCountryObject } from '../utils/data-normalize.helper';

export interface INormalizedData {
  date: string;
  value: number;
}

//@ToDo: should take country/region, api-endpointi as prop
export const CovidChart: React.SFC = () => {
  const { data, error, loading } = useFetch(endpoints.getInfectedByCountry);

  //@ToDo: should use generics and extracted to utils
  const normalizeData = (dataArray: any, propertyToFilter: string, filterName: string): any => {
    const propertyToExclude = ['Province/State', 'Country/Region', 'Lat', 'Long'];
    const filteredData = dataArray.filter((item: any) => item[propertyToFilter] === filterName);
    console.log(filteredData)
    const filteredDataToObject = Object.keys(filteredData[0]).reduce((acc: any, key: any) => {
      if (!propertyToExclude.includes(key)) {
        let composedObject: INormalizedData = {
          date: key,
          value: filteredData[0][key]
        };
        return acc.concat(composedObject);
      }
      return acc;
    }, []);
    return filteredDataToObject;
  };

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  if(data){
    const confirmedWorldCases = extractConfirmedCases(data);
    const confirmedItalyCases = getCountryObject(confirmedWorldCases, 'Italy');
    console.log('Custo: ' ,confirmedItalyCases)
  }

  return (
    <>
    <LineChart
      width={600}
      height={500}
      data={normalizeData(extractConfirmedCases(data), 'Country/Region', 'Italy')}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <ReferenceLine y={getMax(normalizeData(extractConfirmedCases(data), 'Country/Region', 'Italy'))} label="Max" stroke="red" alwaysShow/>
      <Line connectNulls type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
    
    </>
  );
};
