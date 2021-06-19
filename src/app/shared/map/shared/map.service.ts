import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private geocoder;

  constructor(private http: HttpClient) {}

  getcodeLocation(location: string): any {
    const API = environment.API.GOOGLE;
    return this.http.get(`https://maps.googleapis.com/maps/api/js?address=${location}&key=${API}`).pipe(
      map(data => (<any>data).results[0].geometry.location),
      catchError( err => {throw Error('Something goes wring...'); })
    );
  }
}
