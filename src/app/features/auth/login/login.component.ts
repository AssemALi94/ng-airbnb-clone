import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { FormService } from '../../../shared/form/form.service';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errors: any[] = [];
  notifyMessage = '';

  constructor(private fb: FormBuilder,
    private formService: FormService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe(
      (params) => {
        if (params['registered'] === 'success') {
          this.notifyMessage = 'You have succesfully registered, you can login now!';
        }
      }
    );
  }

  initForm() {
    this.loginForm = new FormGroup( this.fb.group({
      email: ['', [Validators.required,
          Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required]
    }).controls, {updateOn: 'blur'});
  }

  isValidInput(inputValue): boolean {
    return this.formService.isValidInput(this.loginForm, inputValue);
  }

  isRequired(inputValue): boolean {
    return this.formService.isRequired(this.loginForm, inputValue);
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        this.router.navigate(['/rentals', {login: 'success'}]);
      },
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

}
