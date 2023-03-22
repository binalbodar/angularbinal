import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  loginStatus: any;
  element: any;

  constructor(
    public lS: LoginService
  ) {
    this.loginForm = new FormGroup({
      EmailId: new FormControl("", [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    })
  }

  clearForm() {
    this.loginForm.reset();
  };

  ngOnInit() {
    this.lS.isLoggedIn.subscribe((status) => {
      this.loginStatus = status;
    });
  }

  login() {
    this.lS.loginUser();
    this.clearForm();
  }
  logout() {
    this.lS.logoutUser();
  }

}
