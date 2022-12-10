import { Component } from '@angular/core';
import { FetchDataService } from './fetch-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-todo-app';
  todos:any;
  users:any;
  userLogedIn:any;
  constructor(private _userservie:FetchDataService){}

  ngOnInit(){
    this._userservie.fetchusers().subscribe(res => {
      localStorage.setItem('users',JSON.stringify(res));
      let tmpusers:any = localStorage.getItem('users');
      this.users = JSON.parse(tmpusers);
    })
  }

}
