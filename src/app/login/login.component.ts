import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm:any = FormGroup;
  loginData: any;
  users:any;
  userLogedIn:any;
  showError:any;

  constructor(private router: Router) { 
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }


  getUserByEmailAndUserName(){
    // this.isLoggedIn = false;
    let tmpusers:any = localStorage.getItem('users');
    this.users = JSON.parse(tmpusers);
    let tmpUserLogedIn =  this.users.find((user:any) => user.email === this.loginData.email && user.username === this.loginData.username);
    if(tmpUserLogedIn){
      this.userLogedIn = tmpUserLogedIn;
      this.showError = false;
    } else {
      console.log('not found');
      this.showError = true;
    }
  }

  onSubmit(data:any){
    this.loginData = data;
    this.getUserByEmailAndUserName();
    if(this.userLogedIn) {
      // if server side inplemented we will use Cookie to save the logged in user
      localStorage.setItem('secureCookie',JSON.stringify(this.userLogedIn));
      this.router.navigate(['/todos']);
    }
  }

}
