import { Injectable } from '@angular/core'; // Injectable decorator
import { HttpClient, HttpParams } from '@angular/common/http'; // HttpParams for query parameters
import { CurrentWeather } from '../models/current-weather.model';
import { WeatherForecast } from '../models/weather-forecast.model';
import { environment } from '../../../../../environments/environment'; // Environment variables
import { catchError, retry, throwError , Observable, map, forkJoin } from 'rxjs'; // rxjs imports

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiBase = environment.weatherApiBaseUrl; // 'http://api.weatherapi.com/v1'
  private apiKey = environment.weatherApiKey;

  constructor(private http: HttpClient) {}

  getCurrent(location: string): Observable<CurrentWeather> {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('q',  location);

    return this.http.get<any>(`${this.apiBase}/current.json`, { params }).pipe(
      retry(2),
      map(res => ({
        location: res.location.name,
        country: res.location.country,
        region: res.location.region,
        temperatureC: res.current.temp_c,
        temperatureF: res.current.temp_f,
        condition: res.current.condition.text,
        conditionIcon: res.current.condition.icon,
        windKph: res.current.wind_kph,
        humidity: res.current.humidity,
        feelsLikeC: res.current.feelslike_c,
        uvIndex: res.current.uv,
        lastUpdated: res.current.last_updated
      })),
      catchError(err => throwError(() => new Error('Current weather data could not be retrieved ❗')))
    );
  }

  getForecast(location: string, days: number = 3): Observable<WeatherForecast> {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('q', location)
      .set('days', days.toString());

    return this.http.get<any>(`${this.apiBase}/forecast.json`, { params }).pipe(
      retry(2),
      map(res => ({
        location: res.location.name,
        country: res.location.country,
        forecast: res.forecast.forecastday.map((day: any) => ({
          date: day.date,
          maxTempC: day.day.maxtemp_c,
          minTempC: day.day.mintemp_c,
          condition: day.day.condition.text,
          conditionIcon: day.day.condition.icon,
          chanceOfRain: day.day.daily_chance_of_rain,
          maxWindKph: day.day.maxwind_kph,
          avgHumidity: day.day.avghumidity,
          uvIndex: day.day.uv
        }))
      })),
      catchError(err => throwError(() => new Error('Forecast data could not be retrieved ❗')))
    );
  }
}
