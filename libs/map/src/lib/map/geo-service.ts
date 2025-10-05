import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { District } from './geo.model';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  constructor(private http: HttpClient) { }
    getDistrict(): Observable<District[]> {
  
    return this.http.get<any[]>('/assets/ist_geo.json').pipe(
        map((data: any[]) =>
        data.map((item: any) => ({
            name: item.District,
            lat: parseFloat(item.Coordinates.split(',')[0]), // Latitude
            lon: parseFloat(item.Coordinates.split(',')[1]), // Longitude
            rating: item.Rating ?? 0 // add rating (default 0 if missing)
        }))
        
        )
        
    );
    
    }
    
}
