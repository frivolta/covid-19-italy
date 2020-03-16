const covidUrl = 'https://covid2019-api.herokuapp.com';

//Use absoluteUrl for production environment
const createEndpoint = (absoluteUrl: string, endpoint: string): string =>
  process.env.NODE_ENV === 'production' ? absoluteUrl + endpoint : endpoint;

//Endpoint definitions
export const endpoints = {
  getInfectedByCountry: '/timeseries/confirmed'
};
