import { Component, OnInit } from '@angular/core';
import { User } from "../../../shared/model/user/user";
import { UserService } from "../../../core/service/user-service/user.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from "../../../core/validators/custom-validators";
import { PasswordDto } from "../../../shared/model/user/passwordDto";
import { throwError } from "rxjs";

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {

  user: User = {
    userId: 0,
    username: '',
    password: '',
    email: '',
    phone: '',
    address: '',
  };

  updateInfoForm!: FormGroup;
  updatePasswordForm!: FormGroup;
  isError: boolean = false;
  passwordUpdated: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(user => {
      this.user = user;
      this.initForms();
    });

    this.initForms();
  }

  initForms() {
    this.updateInfoForm = new FormGroup({
      email: new FormControl({ value: this.user.email, disabled: true }),
      username: new FormControl({ value: this.user.username, disabled: true }),
      phone: new FormControl(this.user.phone),
      address: new FormControl(this.user.address),
    });

    this.updatePasswordForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
      ])),
    });
  }

  updateInfo() {
    const updatedUser: User = {
      ...this.user,
      phone: this.updateInfoForm.get('phone')?.value,
      address: this.updateInfoForm.get('address')?.value,
    };

    this.userService.updateUserInfo(updatedUser).subscribe(data => {
      console.log("data",data);
      
      this.user = data;
    }, error => {
      this.isError = true;
      throwError(error);
    });
  }

  updatePassword() {
    const passwordDto: PasswordDto = {
      oldPassword: this.updatePasswordForm.get('oldPassword')?.value ?? '',
      newPassword: this.updatePasswordForm.get('password')?.value ?? ''
    };

    this.userService.updatePassword(passwordDto).subscribe(data => {
      this.isError = false;
      this.passwordUpdated = true;
    }, error => {
      this.isError = true;
      this.passwordUpdated = false;
      throwError(error);
    });
  }
}
