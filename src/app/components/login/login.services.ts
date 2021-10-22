import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../users/user.model';

interface LoginResponseData {
    email : string;
    refreshToken: string;
    idToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({
    providedIn: 'root'
  })

export class LoginServices {
    public loggedUser = new BehaviorSubject(null);
    constructor(
        private http: HttpClient,
        private router: Router,
      ) {}
    
    loginUser(body : any) {
        return this.http.post('/api/login', {
            'email' : body.email,
            'password': body.password,
        });
    }

    registerUser(body : any) {
        return this.http.post('/api/register', {
            'username' : body.username,
            'email' : body.email,
            'password': body.password,
            'isAdmin': body.isAdmin
        });
    }
}