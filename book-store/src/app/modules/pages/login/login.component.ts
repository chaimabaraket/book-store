import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/authentication/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../../../shared/model/login/login-request';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRequest: LoginRequest;
  loginForm!: FormGroup;
  isError: boolean = false;

  constructor(private authService: AuthService,
              private router: Router) {
    this.loginRequest = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))
    });
  }

  login() {
    this.loginRequest.username = this.loginForm.get('username')?.value || '';
    this.loginRequest.password = this.loginForm.get('password')?.value || '';

    this.authService.login(this.loginRequest)
      .pipe(
        catchError(error => {
          this.isError = true;
          return throwError(error);
        })
      )
      .subscribe(data => {
        console.log("success auth", data);

        this.isError = false;
        this.router.navigateByUrl('');
      });
  }
}
