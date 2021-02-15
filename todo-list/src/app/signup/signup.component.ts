import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model'
import { UserAuthenticated } from '../models/user-authenticated.model'
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  returnUrl: string;
  userAuthenticated: UserAuthenticated;
  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly _userService: UserService,
    private readonly toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      userName: ['', Validators.required],
      userEmail: ['', Validators.required], 
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
    this.returnUrl = '/home';
  }

  register(): void {

    if(this.signupForm.get('password').value.trim() === this.signupForm.get('confirmPassword').value.trim()){
      let userAuthenticate: User = {
        name: this.signupForm.get('userName').value.trim(),
        email: this.signupForm.get('userEmail').value.trim(),
        password: this.signupForm.get('password').value.trim()
      }
  
      this._userService.userRegister(userAuthenticate).subscribe( (user: any)  => {
        this.userAuthenticated = user;
          localStorage.setItem('token', this.userAuthenticated.token);
          localStorage.setItem('userId', this.userAuthenticated.user._id);
          localStorage.setItem('isAuthenticated', 'true');
          this.router.navigate([this.returnUrl]);
        });
    }
    else{
      this.toastr.error('Passwords entered are divergent. Please try again.', '');
    }
  }
}
