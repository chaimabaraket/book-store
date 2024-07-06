import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../core/authentication/auth.service';
import { SignupRequest } from '../../../shared/model/signup/signup-request';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  signupRequest: SignupRequest = {
    email: '',
    username: '',
    password: ''
  };
  isError = false;
  isSuccess = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        // Custom validators as needed
      ])),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  submit(): void {
    if (this.signupForm.invalid) {
      return;
    }

    this.signupRequest.email = this.signupForm.get('email')!.value;
    this.signupRequest.username = this.signupForm.get('username')!.value;
    this.signupRequest.password = this.signupForm.get('password')!.value;

    this.authService.signup(this.signupRequest)
      .subscribe(
        (data) => {
          this.isError = false;
          this.isSuccess = true;
          // Optionally navigate to another page or perform other actions
        },
        (error) => {
          this.isError = true;
          this.isSuccess = false;
          throwError(error);
        }
      );
  }
}
