import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

interface IUser {
  username: string;
  email: string;
}

interface IUsers {
  id: number;
  username: string;
  email: string;
}

interface IUserLogedIn {
  id: number;
  username: string;
  email: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm:any = FormGroup;
  loginData:IUser | undefined;
  users:IUsers[] | undefined;
  userLogedIn:IUserLogedIn | undefined;
  showError:boolean = false;

  constructor(private router: Router) { 
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }


  getUserByEmailAndUserName(){
    let tmpusers:any = localStorage.getItem('users');
    this.users = JSON.parse(tmpusers);
    let tmpUserLogedIn =  this.users?.find((user:IUserLogedIn) => user.email === this.loginData?.email && user.username === this.loginData?.username);
    if(tmpUserLogedIn){
      this.userLogedIn = tmpUserLogedIn;
      this.showError = this.showError;
    } else {
      this.showError = !this.showError;
    }
  }

  onSubmit(data:IUser){
    this.loginData = data;
    this.getUserByEmailAndUserName();
    if(this.userLogedIn) {
      // if server side inplemented we will use Cookie to save the logged in user
      localStorage.setItem('secureCookie',JSON.stringify(this.userLogedIn));
      this.router.navigate(['/todos']);
    }
  }

}
