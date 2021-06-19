import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Rental } from './rental.model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private http: HttpClient) { }

  getRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>('/api/v1/rentals').pipe(
      map(rentals => rentals['data']),
      catchError<Rental[], never>(error => of({error: true, detail: error.message}))
    );
  }

  getRentalById(rentalId: string): Observable<Rental> {
    return this.http.get<Rental>(`/api/v1/rentals/${rentalId}`).pipe(
      map(rental => rental['data']),
      catchError<Rental, never>(error => of({error: true, detail: error.message}))
    );
  }
}
