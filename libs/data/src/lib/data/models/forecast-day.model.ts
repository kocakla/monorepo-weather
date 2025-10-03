export interface ForecastDay {
  date: string; // ISO string
  maxTempC: number; // Maximum temperature in Celsius
  minTempC: number; // Minimum temperature in Celsius
  condition: string; // Weather condition text
  conditionIcon: string; // URL to the weather condition icon
  chanceOfRain: number; // Chance of rain percentage
  maxWindKph: number; // Maximum wind speed in kph
  avgHumidity: number; // Average humidity percentage
  uvIndex: number; // UV index
}