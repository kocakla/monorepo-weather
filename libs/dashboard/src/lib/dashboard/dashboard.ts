import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../../../data/src/lib/data/services/weather-service';
import { WeatherComponent } from './weather-ui';
import { ForecastComponent } from './forecast-ui';
import { CurrentWeather } from 'libs/data/src/lib/data/models/current-weather.model';
import { WeatherForecast } from 'libs/data/src/lib/data/models/weather-forecast.model';

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, WeatherComponent, ForecastComponent],
  templateUrl: './dashboard.html',
})
export class WeatherDashboardComponent {
  location = 'Istanbul';
  current: any;
  forecast: any;
  mode: 'current' | 'forecast' = 'current'; // toggle

  constructor(private weatherService: WeatherService) {}

  search() {
    this.weatherService.getCurrent(this.location).subscribe(data => this.current = data);
    this.weatherService.getForecast(this.location, 3).subscribe(data => this.forecast = data);
  }
}