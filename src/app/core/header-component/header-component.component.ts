import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss']
})
export class HeaderComponentComponent {

  constructor(public auth: AuthService,
  private router: Router) { }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
