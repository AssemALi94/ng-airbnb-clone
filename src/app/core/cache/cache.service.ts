import { catchError } from 'rxjs/operators';
/*
Thanks to:
https://hackernoon.com/angular-simple-in-memory-cache-service-on-the-ui-with-rxjs-77f167387e39
*/
import { Observable, Subject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private cache: Map<string, CacheContent> = new Map<string, CacheContent>();
  private inFlightObservables: Map<string, Subject<any>> = new Map<string, Subject<any>>();
  readonly DEFAULT_MAX_AGE = 300000;

  constructor() {
    console.log('Costruisco il servizio');
  }

  get(key: string, fallback?: Observable<any>, maxAge?: number): Observable<any> | Subject<any> {
    if (this.hasValidCachedValue(key)) {
      console.log(`%cGetting from cache ${key}`, 'color: green');
      return of(this.cache.get(key).value);
    }

    if (this.inFlightObservables.has(key) ) {
      return this.inFlightObservables.get(key);
    } else if (fallback && fallback instanceof Observable) {
      // Need the value from a fallback function
      this.inFlightObservables.set(key, new Subject());
      return fallback.pipe(
        tap((value) => {
          this.set(key, value, maxAge);
        }),
        catchError( (err) => {
          console.log('ERRORE');
          throw Error(err);
        } )
      );
    } else {
      console.log(`%cCan't caching ${key}`, 'color: red');
      return Observable.throw('Requested key is not available in Cache');
    }

  }

  set(key: string, value: any, maxAge: number = this.DEFAULT_MAX_AGE): void {
    console.log(`%cSetting to cache ${key}`, 'color: orange');
    this.cache.set(key, { value: value, expiry: Date.now() + maxAge });
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  private hasValidCachedValue(key: string): boolean {
    console.log(`%cChecking into cache for ${key}`, 'color: blue');
    if (!this.has(key) || this.cache.get(key).expiry < Date.now() ) {
      return false;
    }
    return true;
  }

}
