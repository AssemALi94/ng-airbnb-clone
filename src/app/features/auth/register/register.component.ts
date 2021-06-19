import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formData: any = {};
  errors: any[] = [];
  terms = true;

  constructor(private authService: AuthService,
  private router: Router) { }

  register() {
    this.authService.register(this.formData).subscribe(
      () => this.router.navigate(['/auth/login', {registered: 'success'}]),
      (err) => {
        this.errors = [];
        if (!Array.isArray(err.error.errors)) {
          this.errors.push({description: err.message});
        } else {
          this.errors = err.error.errors;
        }
      }
    );
  }

  checkTerms() {
    this.terms = !this.terms;
  }

  buttonState() {
    return this.terms;
  }

}
