import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

/**
 * ConfigService is responsible for providing global configuration values
 * such as API URLs and API keys.
 * This ensures that sensitive or reusable constants are centralized.
 */
@Injectable({ providedIn: 'root' })
export class ConfigService {
  readonly weatherApiUrl = environment.weatherApiBaseUrl;   // Base URL of your backend API
  readonly mapTileUrl = environment.mapTileUrl;      // Example: Leaflet map tiles
}
