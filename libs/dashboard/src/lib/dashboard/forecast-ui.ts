import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { WeatherForecast } from "libs/data/src/lib/data/models/weather-forecast.model";

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="forecast">
      <h3>Forecast</h3>
      <div *ngFor="let day of forecast.forecast" class="forecast-day">
        <p>{{ day.date }} - {{ day.condition }}</p>
        <img [src]="day.conditionIcon" alt="icon">
        <p>Max: {{ day.maxTempC }}°C | Min: {{ day.minTempC }}°C</p>
        <p>Chance of Rain: {{ day.chanceOfRain }}%</p>
        <p>Wind: {{ day.maxWindKph }} kph | Humidity: {{ day.avgHumidity }}%</p>
        <p>UV Index: {{ day.uvIndex }}</p>
        <hr>
      </div>
    </div>
  `
})
export class ForecastComponent {
  @Input() forecast!: WeatherForecast | null;
}