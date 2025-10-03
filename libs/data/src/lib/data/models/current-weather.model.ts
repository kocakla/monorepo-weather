export interface CurrentWeather {
  location: string; // City or location name
  country: string; // Country name
  region: string; // State or region
  temperatureC: number; // Temperature in Celsius
  temperatureF: number; // Temperature in Fahrenheit
  condition: string; // Weather condition text
  conditionIcon: string; // URL to the weather condition icon
  windKph: number; // Wind speed in kph
  humidity: number; // Humidity percentage
  feelsLikeC: number; // Feels like temperature in Celsius
  uvIndex: number; // UV index
  lastUpdated: string; // ISO string formatında tarih
}