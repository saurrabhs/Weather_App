import axios from 'axios';
import { WeatherData, LocationSuggestion } from '../types/weather';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || "79add14d4c2147f4b2a124336251003";
const BASE_WEATHER_URL = "http://api.weatherapi.com/v1/current.json";
const AUTOCOMPLETE_URL = "http://api.weatherapi.com/v1/search.json";

export const weatherApi = {
  getCurrentWeather: async (query: string): Promise<WeatherData> => {
    const response = await axios.get(
      `${BASE_WEATHER_URL}?key=${API_KEY}&q=${query}`
    );
    return response.data;
  },

  getLocationSuggestions: async (query: string): Promise<LocationSuggestion[]> => {
    const response = await axios.get(
      `${AUTOCOMPLETE_URL}?key=${API_KEY}&q=${query}`
    );
    return response.data;
  },
};
