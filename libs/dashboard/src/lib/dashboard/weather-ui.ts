import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentWeather } from 'libs/data/src/lib/data/models/current-weather.model';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./weather-ui.html`,
  styleUrls: [`./weather-ui.css`]
})
export class WeatherComponent {
  @Input() current!: CurrentWeather | null;
}
