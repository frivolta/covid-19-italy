import * as React from 'react';
import {getMax} from '../utils/helpers'
import {  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { useFetch } from '../hooks/useFetch';
import { extractConfirmedCases, getCountryObject, cleanCountryObject, INormalizedData } from '../utils/data-normalize.helper';


export interface ICovidChart{
  apiUrl: string;
  country: string;
}

export const CovidChart: React.FC<ICovidChart> = (props) => {
  const { data, error, loading } = useFetch(props.apiUrl);
  const [normalizedData, setNormalizedData] = React.useState<INormalizedData[]>([{date: '0', value: 0}])
  const [maxData, setMaxData] = React.useState<number>(0)

  React.useEffect(()=>{
    if(data){
      const confirmedWorldCases = extractConfirmedCases(data);
      const confirmedItalyCases = getCountryObject(confirmedWorldCases, props.country);
      const cleanedCountryObject = cleanCountryObject(confirmedItalyCases, false);
      const maxCountryValue = getMax(cleanedCountryObject)
      setNormalizedData(cleanedCountryObject)
      setMaxData(maxCountryValue)
    }
  }, [data])

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <>
    <LineChart
      width={600}
      height={500}
      data={normalizedData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <ReferenceLine y={maxData} label="Max" stroke="red" alwaysShow/>
      <Line connectNulls type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
    
    </>
  );
};
