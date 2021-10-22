import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServices } from '../login/login.services';
import { UserServices } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: any;
  userList: any = [];
  colors = [
    '#B6D8F2',
    '#F4CFDF',
    '#E4CEE0',
    '#98D4BB',
    '#FEB67B',
    '#E8D595',
    '#DB93A5',
    '#B19CD9',
    '#E6D1D2',
    '#B2B2B2',
    '#EEB8C5',
    '#A9C8C0',
    '#AE8A8C',
    '#C2D9E1',
    '#E2E5CB',
    '#D9C2BD',
    '#7C98AB',
    '#DBBC8E',
    '#EEB8C5',
    '#E5DB9C',
    '#CAE7E3',
  ];

  avatars : any = [
    'https://image.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg',
    'https://image.freepik.com/free-vector/vintage-chicano-tattoo-template_225004-1474.jpg',
    'https://image.freepik.com/free-vector/vintage-criminal-concept_225004-150.jpg',
    'https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
    'https://image.freepik.com/free-vector/modern-professional-knights-logo-mascot-game-design-template_1258-29033.jpg'
  ];
  
  constructor(
    private router: Router,
    public loginService: LoginServices,
    public userServices: UserServices
  ) { }

  ngOnInit(): void {
    this.user =  {
      'username': 'shivam patel', 
      'email': 'shivam@ai', 
      'id': '6171631f8d774a327c5d99b4', 
      '_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7I…3ODZ9.iB2nexQ17IR4CZxmcrwWJ5SARzT1s51MDLPRpF-8K4M',
      'isAdmin': true
    }
    // this.loginService.loggedUser.subscribe((user) => {
    //   console.log(user);
    //   this.user = user;
    // })
    this.fetchUsers();
  }

  async fetchUsers() {
    let users = await this.userServices.fetchUsers();
    // this.userList = users;
    Object.entries(users).forEach(([key,value]) => {
      console.log(key);
      if(key == 'users') {
        this.userList = value.slice();
      }
    });
    this.userList.forEach((user : any) => {
      console.log(user);
      let [ firstName , lastName ] = user['name'].split(' ');
      console.log(firstName);
      user.firstName = (firstName || " ").toUpperCase();
      user.lastName = (lastName || " ").toUpperCase();
    });
    console.log(users);
  }

  deleteUser(id : any) {
    this.userServices.deleteUser(id);
    this.userList = this.userList.filter((x : any) => x._id != id);
  }

  randomGenerator(){
    return this.avatars[Math.floor(Math.random() * this.avatars.length)];
  }

  addUser() {
    this.userServices.addUser({});
  }

  randomColor(index : any) {
    let returnValueIndex = index;
    if (returnValueIndex > 20) {
      returnValueIndex = returnValueIndex % 20;
    }
    return this.colors[returnValueIndex];
  }

  routeToBlogs() {
    this.router.navigate(['/blogs']);
  }

  logoutUser() {
    this.loginService.loggedUser.next(null);
    localStorage.removeItem('isAuthenticated');
    this.router.navigateByUrl('/');
  }
}
