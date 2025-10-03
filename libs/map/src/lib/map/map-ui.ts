import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, NgZone } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  template: `<div id="map" class="map-container"></div>`,
  styles: [`
    .map-container {
      width: 100%;
      height: 400px;
    }
  `]
})
export class MapComponent implements AfterViewInit {

  private map!: L.Map;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    // DOM tam hazır olduğunda çalıştır
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.map = L.map('map').setView([41.0082, 28.9784], 10);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        this.map.invalidateSize(); // kesin boyutlama için
      }, 0);
    });
  }
  invalidateMap() {
    this.map?.invalidateSize();
  }
   
  }
