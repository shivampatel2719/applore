import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../users/user.model';

@Injectable({
    providedIn: 'root'
  })

export class UserServices {
    constructor(
        private http: HttpClient,
        private router: Router,
      ) {}

    fetchUsers() {
        return this.http.get('/api/users').toPromise();
    }

    deleteUser(id : any) {
        return this.http.delete('api/users/' + id.toString()).toPromise();
    }

    addUser(body : any) {

    }
}