import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../users/user.model';
import { LoginServices } from './login.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  type: any;
  error: any;
  username: any;
  email: any;
  isAdmin: any;
  passwords: any = {
    'password' : '',
    'repassword': ''
  };
  constructor(
    private loginServices: LoginServices,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.type = 'LOGIN';
    this.autoLogin();
    this.verifyPassword();
  }

  autoLogin() {
    let userData = localStorage.getItem('isAuthenticated');
    if(userData) {
      this.AddUserToSubject(JSON.parse(userData));
      this.router.navigateByUrl('/blogs');
    }
  }

  verifyPassword() {
    if(this.passwords['password'] && this.passwords['password'].length < 3) {
      this.error = 'Password must be greater than 3 characters';
    }
    else if(this.passwords['password'] != this.passwords['repassword']) {
      this.error = 'Passwords do not match';
    }
    else {
      this.error = null;
    }
  }

  AddUserToSubject(userObj : any) {
    this.loginServices.loggedUser.next(userObj);
    localStorage.setItem('isAuthenticated',JSON.stringify(userObj));
  }

  async onSubmit(type : any) {
    let Obs;
    if(type == 'login') {
      Obs = this.loginServices.loginUser({
        'email': this.email,
        'password': this.passwords['password'],
      });
    }
    else { 
      Obs = this.loginServices.registerUser({
        'username': this.username,
        'email': this.email,
        'password': this.passwords['password'],
        'isAdmin': this.isAdmin
      });
    }
    Obs.subscribe((res : any) => {
      if(res['statusCode'] == 200) {
        let username;
        if(this.username) {
          username = this.username;
        }
        else {
          username = res['user']['name'];
        }
        const userObj = new User(username,this.email,res['user']['_id'],res['user']['isAdmin'],res['token']);
        this.AddUserToSubject(userObj);
        this.router.navigateByUrl('/blogs');
      }
      else { 
        console.log('error');
        this.error = res['error'];
        this.AddUserToSubject(null);
      }
    });
  }
}
