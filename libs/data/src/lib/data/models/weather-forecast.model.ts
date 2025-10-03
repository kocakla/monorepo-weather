import { ForecastDay } from './forecast-day.model'; // Import ForecastDay interface

export interface WeatherForecast {
  location: string; // City or location name
  country: string; // Country name
  forecast: ForecastDay[]; // Array of daily forecasts
}
