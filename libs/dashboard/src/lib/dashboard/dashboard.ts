import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../../../data/src/lib/data/services/weather-service';
import { WeatherComponent } from './weather-ui';
import { ForecastComponent } from './forecast-ui';
import { CurrentWeather } from 'libs/data/src/lib/data/models/current-weather.model';
import { WeatherForecast } from 'libs/data/src/lib/data/models/weather-forecast.model';
import { MapComponent } from 'libs/map/src/lib/map/map';
import { map } from 'leaflet';

type DashboardMode = 'current' | 'forecast' | 'map';


@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, WeatherComponent, ForecastComponent, MapComponent],
  templateUrl: './dashboard.html',
})
export class WeatherDashboardComponent {
  @ViewChild(MapComponent) mapComponent!: MapComponent;
  location = 'Istanbul';
  current: any;
  forecast: any;
  mode: DashboardMode = 'current'; // toggle
  

  constructor(private weatherService: WeatherService) {}

  search() {
    this.weatherService.getCurrent(this.location).subscribe(data => this.current = data);
    this.weatherService.getForecast(this.location, 3).subscribe(data => this.forecast = data);
    
  }
  toggleMode(newMode: DashboardMode) {
    this.mode = newMode;
  }
}
