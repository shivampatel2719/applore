import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginServices } from '../login/login.services';
import { BlogServices } from './blog.service';
import { ConfirmationComponentComponent } from 'src/app/dialogs/confirmation-component/confirmation-component.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit,OnDestroy {
  isAuthenticated = false;
  user: any;
  editBlogMode: any = {};
  editedContent: any = {};
  ratings: any = {};
  fixedratings: any = {};
  hoverStar: any = {};
  blogs: any = {
    'approved' : [],
    'pending': [],
    'rejected': []
  };

  avatars : any = [
    'https://image.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg',
    'https://image.freepik.com/free-vector/vintage-chicano-tattoo-template_225004-1474.jpg',
    'https://image.freepik.com/free-vector/vintage-criminal-concept_225004-150.jpg',
    'https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
    'https://image.freepik.com/free-vector/modern-professional-knights-logo-mascot-game-design-template_1258-29033.jpg'
  ];

  blogCategory: any = 'approved';
  blogTitle: any = null;
  blogContent: any = null;
  imgUrl: any = null;
  constructor(
    private router: Router,
    public loginService: LoginServices,
    public blogServices: BlogServices,
    public dialog: MatDialog,
    private snackbar: MatSnackBar
    ) { }

  ngOnInit(): void {
    // this.user =  {
    //       'username': 'shiv sharma', 
    //       'email': 'shivam@ai', 
    //       'id': '6171b7475e6d1028ecb4ff51', 
    //       'isAdmin': true, 
    //       '_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7I…AwOX0._nVuNEP3B4OiBC66sT4tOOh3EsN5AfoCnwBx68wLNN8'
    //     }; 
    this.loginService.loggedUser.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    })
    this.fetchBlogs();
    this.randomGenerator();
  }

  randomGenerator(){
    this.imgUrl =  this.avatars[Math.floor(Math.random() * this.avatars.length)];
  }

  routeToUsers() {
    this.router.navigate(['/users']);
  }

  clear() {
    this.blogTitle = '';
    this.blogContent = '';
  }

  async fetchBlogs() {
    let resBlogs;
    if(this.user.isAdmin) {
      resBlogs = await this.blogServices.getAllBlogs();
      this.fillValuesAdmin(resBlogs,'userBlogs');
    }
    else {
      resBlogs =  await this.blogServices.getUserBlogs({
        'user' : this.user.id
      });
      this.fillValues(resBlogs,'userBlogs');
    }
  }

  fillValues(resBlogs : any, keyName : any) {
    Object.entries(resBlogs).forEach(([key,value] : any) => {
      if(key == keyName) {
        value.forEach((v : any) => {
          this.editBlogMode[v['_id']] = false;
          this.editedContent[v['_id']] = {
            'title' : v['title'],
            'content': v['content']
          };
          this.ratings[v['_id']] = v['rating'];
          this.hoverStar[v['_id']] = false;
          this.fixedratings[v['_id']] = v['rating'];
          if(v['state'] == 2 ){
            this.blogs['approved'].push(v);
          }
          else if(v['state'] == 0) {
            this.blogs['rejected'].push(v);
          }
          else {
            this.blogs['pending'].push(v);
          }
        });
      }
    });
  }

  fillValuesAdmin(resBlogs: any, keyName : any) {
    Object.entries(resBlogs).forEach(([key,value] : any) => {
      if(key == keyName) {
        value.forEach((v : any) => {
          this.editBlogMode[v['_id']] = false;
          this.editedContent[v['_id']] = {
            'title' : v['title'],
            'content': v['content']
          };
          this.ratings[v['_id']] = v['rating'];
          this.hoverStar[v['_id']] = false;
          this.fixedratings[v['_id']] = v['rating'];
          if(v['state'] == 1) {
            this.blogs['pending'].push(v);
          }
          else if(v['state'] == 2) {
            this.blogs['approved'].push(v);
          }        
        });
      }
    });
  }

  async saveBlog() {
    let res = await this.dialog.open(ConfirmationComponentComponent, {
      data : {
        title : 'Save Blog?',
        message : 'You are about to save blog. Proceed with confirmation.'
      }
    }).afterClosed().toPromise();
    if(res['value']) {
      let Obs = this.blogServices.createBlog({
        'user' : this.user.id,
        'title': this.blogTitle,
        'content': this.blogContent,
        'date': new Date(),
        'rating': 0
      });
      Obs.subscribe((res) => {
        Object.entries(res).forEach(([key,value] : any) => {
          if(key == 'blog') {
            if(value['state']) {
              if(value['state'] == 0 ){
                this.blogs['rejected'].push(value);
              }
              else if(value['state'] == 1) {
                this.blogs['pending'].push(value);
              }
              else {
                this.blogs['approved'].push(value);
              }
            }
            else {
              this.blogs['pending'].push(value);
            }
          }
        });
        this.clear();
        this.snackbar.open(`Blog Saved `, 'close', { duration: 2000 });
        this.blogCategory = 'pending';
      });
    }
  }

  toggleEdit(id : any) {
    this.editBlogMode[id] = !this.editBlogMode[id];
  }

  async editBlog(id : any, type: any) {
    let date = new Date();
    let value = await this.dialog.open(ConfirmationComponentComponent, {
      data : {
        title : 'Update Blog?',
        message : 'You are about to update blog. Proceed with confirmation.'
      }
    }).afterClosed().toPromise();
    
    if(value['value']) {
      let res = await this.blogServices.editBlog({
        'id' : id,
        'title' : this.editedContent[id]['title'],
        'content': this.editedContent[id]['content'],
        'date' : date
      });
      Object.entries(res).forEach(([key,value]) => {
        if(key == 'statusCode' && value == 200) {
          this.blogs[type].forEach((blog : any) => {
            if(blog['_id'] == id) {
              blog.title = this.editedContent[id]['title'],
              blog.content = this.editedContent[id]['content'];
              blog.date = date;
            }
          });
          this.editBlogMode[id] = false;
          this.snackbar.open(`Blog Updated `, 'close', { duration: 2000 });
        }
      });
    }
  }

  async deleteBlog(id : any, type: any) {
    let res = await this.dialog.open(ConfirmationComponentComponent, {
      data : {
        title : 'Delete Blog?',
        message : 'You are about to delete blog. Proceed with confirmation.'
      }
    }).afterClosed().toPromise();
    if(res['value']) {
      await this.blogServices.deleteBlog(id);
      this.snackbar.open(`Blog Deleted `, 'close', { duration: 2000 });
      this.blogs[type] = this.blogs[type].filter((x : any) => x._id != id);
    } 
  }

  async ApproveOrRejectBlog(id: any,type : any) {
    let value = await this.dialog.open(ConfirmationComponentComponent, {
      data : {
        title : (type == 'approve' ? 'Approve Blog' : 'Reject Blog') ,
        message : `You are about to ${(type == 'approve' ? 'Approve' : 'Reject')} blog. Proceed with confirmation.`
      }
    }).afterClosed().toPromise();
    if(value['value']) {
      let res = await this.blogServices.ApproveOrRejectBlog({
        'id' : id,
        'status' : type == 'approve' ? 2 : 0 
      });
      this.snackbar.open(`Blog ${type == 'approve' ? 'approved' : 'rejected'} `, 'close', { duration: 2000 });
      this.blogs['pending'] = this.blogs['pending'].filter((x : any) => x._id != id);
      Object.entries(res).forEach(([key,value]) => {
        if(key == 'blog') {
          if(type == 'approve') {
            this.blogs['approved'].push(value);
          }
          else {
            this.blogs['rejected'].push(value);
          }
        }
      });
    }
  }

  async rateBlog(id: any, rating: any) {
    this.fixedratings[id] = rating;
    await this.blogServices.rateBlog({
      id : id,
      rating : rating
    });
    this.snackbar.open(`Blog Rated Successfully `, 'close', { duration: 2000 });
  }

  hoverStarStart(id : any, rating : any) {
    this.ratings[id] = rating;
    this.hoverStar[id] = true;
  }

  logoutUser() {
    this.loginService.loggedUser.next(null);
    localStorage.removeItem('isAuthenticated');
    this.router.navigateByUrl('/');
  }

  ngOnDestroy() {
  }
}

