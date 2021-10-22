import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })

export class BlogServices {
    constructor(
        private http: HttpClient,
        private router: Router,
      ) {}
    
    createBlog(body: any) {
        return this.http.post('/api/createBlog', {
            'user' : body.user,
            'title': body.title,
            'content': body.content,
            'date': body.date,
            'rating': body.rating
        });
    }

    getUserBlogs(body: any) {
        return this.http.get('/api/userBlogs/' + body.user.toString()).toPromise();
    }

    getAllBlogs() {
        return this.http.get('/api/getAllBlogs').toPromise();
    }

    deleteBlog(id : any) {
        return this.http.delete('/api/blog/'+ id.toString()).toPromise();
    }

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

    editBlog(body : any) {
        return this.http.patch('/api/editblog', {
            'id' : body.id,
            'title' : body.title,
            'content' : body.content,
            'date' : body.date
        }).toPromise();
    }

    rateBlog(body : any) {
        return this.http.patch('/api/rateBlog', {
            'id' : body.id,
            'rating': body.rating
        }).toPromise();
    }

    ApproveOrRejectBlog(body : any) {
        return this.http.patch('/api/blog', {
            'id' : body.id,
            'status' : body.status
        }).toPromise();
    }
}