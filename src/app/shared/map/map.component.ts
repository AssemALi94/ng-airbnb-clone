import { Component, OnInit, Input } from '@angular/core';

import { MapService } from './shared/map.service';
import { CacheService } from '../../core/cache/cache.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() location: string;
  isPositionError = false;
  /*@Input()
  set location(location: string) {
    this.cacheService.get(location, this.mapService.getcodeLocation(location)).subscribe(data => {
      this.lat = data.lat;
      this.lng = data.lng;
    });
  }*/

  lat: number;
  lng: number;

  constructor(private mapService: MapService,
    private cacheService: CacheService) { }

  ngOnInit() {
  }

  mapReadyHandler() {
    /*this.mapService.getcodeLocation(this.location).subscribe(data => {
      this.lat = data.lat;
      this.lng = data.lng;
    });*/
    this.cacheService.get(this.location, this.mapService.getcodeLocation(this.location)).subscribe(data => {
      this.lat = data.lat;
      this.lng = data.lng;
      this.isPositionError = false;
    },
    (err) => {
      console.log('Errore da map.component.ts');
      this.isPositionError = true;
    } );
  }

}
