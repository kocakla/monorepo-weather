import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import "leaflet/dist/leaflet.css"
import { environment } from '../../../../environments/environment';
import { GeoService } from './geo-service';
import { WeatherService } from '../../../../data/src/lib/data/services/weather-service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-map',
  template: `<div id="map" style="height: 100vh; width: 100%;"></div>`,
})

export class MapComponent implements OnInit, OnDestroy {
  private map!: L.Map;
  private markers: L.Marker[] = [];
  private geoSub!: Subscription;
  private weatherSub!: Subscription;
  private zoomThreshold = 10; // Örnek zoom eşiği
  private istanbulCenter: L.LatLngExpression = [41.0082, 28.9784];

  constructor(
    private geoService: GeoService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.initMap();
    this.loadMarkers();

    // Zoom event listener
    this.map.on('zoomend', () => {
      this.filterMarkersByZoom();
    });
  }

  ngOnDestroy(): void {
    if (this.geoSub) this.geoSub.unsubscribe();
    if (this.weatherSub) this.weatherSub.unsubscribe();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.istanbulCenter,
      zoom: 10, // Başlangıç zoom
    });

    L.tileLayer(environment.mapTileUrl, {
      maxZoom: 12,
      minZoom: 8,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);
  }

  private loadMarkers(): void {
    this.geoSub = this.geoService.getDistrict().subscribe((locations) => {
      locations.forEach((loc) => {
        const marker = L.marker([loc.lat, loc.lon]);
        (marker as any).data = loc; // marker üzerinde loc bilgisini saklıyoruz
        marker.addTo(this.map);
        this.markers.push(marker);

        // Weather popup
        this.weatherSub = this.weatherService
          .getCurrent(loc.name)
          .subscribe((weather) => {
            const popupContent = `
              <b>${loc.name}</b><br/>
              Weather: ${weather.temperatureC}°C, ${weather.condition}<br/>
              Humidity: ${weather.humidity}% <br/>
              Wind Speed: ${weather.windKph} km/h<br/>
              
            `;
            marker.bindPopup(popupContent);
          });
      });

      // İlk filtreleme
      this.filterMarkersByZoom();
    });
  }

    private filterMarkersByZoom(): void {
        const currentZoom = this.map.getZoom();
        this.markers.forEach((marker) => {
            const loc = (marker as any).data;

            if (currentZoom > this.zoomThreshold) {
            // Yakın: tüm ilçeler görünsün
            marker.addTo(this.map);
            } else {
            // Uzak: sadece rating=1 olanlar görünsün
            if (loc.rating === 1) {
                marker.addTo(this.map);
            } else {
                this.map.removeLayer(marker);
            }
            }
        });
    }
}
