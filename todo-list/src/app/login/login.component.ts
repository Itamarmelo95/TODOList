import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user.model'
import { UserAuthenticated } from '../models/user-authenticated.model'
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  userAuthenticated: UserAuthenticated;
  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly _userService: UserService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userEmail: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/home';
  }

  login(): void {
    debugger;
    let userAuthenticate: User = {
      email : this.loginForm.get('userEmail').value.trim(),
      password: this.loginForm.get('password').value.trim()
    }

    this._userService.userAuthenticate(userAuthenticate).subscribe( (user: any)  => {
      this.userAuthenticated = user;
        localStorage.setItem('token', this.userAuthenticated.token);
        localStorage.setItem('userId', this.userAuthenticated.user._id);
        localStorage.setItem('isAuthenticated', 'true');
        this.router.navigate([this.returnUrl]);
      });
  }
}
