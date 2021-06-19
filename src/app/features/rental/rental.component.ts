import { Component, OnInit } from '@angular/core';
import { RentalService } from './shared/rental.service';
import { Rental } from './shared/rental.model';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.scss']
})
export class RentalComponent implements OnInit {

  rentals: Rental[];

  constructor(private rentalService: RentalService) { }

  ngOnInit() {
    this.rentalService.getRentals().subscribe(
      rentals => this.rentals = rentals,
      err => console.error('Errore', err),
      () => console.log('Done.'));
  }

}
