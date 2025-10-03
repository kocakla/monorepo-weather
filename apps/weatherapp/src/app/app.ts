import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherDashboardComponent } from '../../../../libs/dashboard/src/lib/dashboard/dashboard';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, WeatherDashboardComponent],
  templateUrl: `./app.html`,
})
export class App {}
