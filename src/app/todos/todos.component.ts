import { Component, Inject } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";



interface RadioOptions {
  value: string;
  viewValue: string;
  checked: boolean;
}

interface SelectOptions {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class TodosComponent {
  isAddModalVisible:any;
  todos:any;
  userName:any;
  selectedOption:string = 'all';
  selectOptions: SelectOptions[] = [
    {value: 'all', viewValue: 'All'},
    {value: 'done', viewValue: 'Done'},
    {value: 'undone', viewValue: 'UnDone'},
    {value: 'new', viewValue: 'New'}
  ]
  selectedRadio:string = 'all';
  radioOptions: RadioOptions[] = [
    {value: 'all', viewValue: 'All', "checked": true},
    {value: '5', viewValue: '5', "checked": false},
    {value: '10', viewValue: '10', "checked": false},
    {value: '20', viewValue: '20', "checked": false}
  ]


  constructor(private _todoservie:FetchDataService, private router: Router, private dialog: MatDialog){}

  openDialog(event:any) {
    this.isAddModalVisible = true;
  }

  closeDialog(){
    this.isAddModalVisible = false;
  }

  handleAddCancel() {
    // this.isAddModalVisible = false;
  }

  getUsersTodos(id:any){
    this._todoservie.fetchtodos(id).subscribe(res => {
      localStorage.setItem('todos',JSON.stringify(res));
      let tmptodos:any = localStorage.getItem('todos');
      // console.log('tmptodos>>>', tmptodos);
      this.todos = JSON.parse(tmptodos);
    })
  }

  ngOnInit(){
    // debugger;
    this.isAddModalVisible = false;
    let tmptodos:any = localStorage.getItem('todos');
    let tmpCookie:any = localStorage.getItem('secureCookie');
    let userCookie = JSON.parse(tmpCookie);
    this.userName = userCookie.username;
    
    if(userCookie=== null || typeof userCookie === 'undefined' || userCookie?.length === 0){
      this.router.navigate(['/']);
    } else {
      this.getUsersTodos(userCookie.id);

      // Ето надо
      // if(tmptodos === null || typeof tmptodos === 'undefined' || tmptodos?.length === 0 ){
      //   this.getUsersTodos(userCookie.id);
      // } else {
      //   if(newtodo !== null || typeof newtodo !== 'undefined' && newtodo?.length !== 0 ){
      //     this.todos = JSON.parse(tmptodos);
      //     this.todos?.unshift(tmpnewtodo);
      //     localStorage.setItem('todos',JSON.stringify(this.todos));
      //   }
      // }
    }
    

    

    
  }


  radioChange(event:any){
    this.selectedRadio = event.value;
    // console.log(this.selectedRadio);
    let tmptodos:any = localStorage.getItem('todos');
    let tmpparsedtodos:any = JSON.parse(tmptodos);
    if(this.selectedRadio !== 'all'){
      // console.log('1', this.selectedRadio);
      this.todos = tmpparsedtodos.splice(0, this.selectedRadio);
      console.log('1>', this.todos);
    } else {
      // console.log('2', this.selectedRadio);
      this.todos = tmpparsedtodos;
      console.log('2>', this.todos);

    }
  }

  selectChange(event:any){
    this.selectedOption = event.value;
    console.log(this.selectedOption);
    let tmptodos:any = localStorage.getItem('todos');
    let tmpparsedtodos:any = JSON.parse(tmptodos);
    if(this.selectedOption === 'done'){
      console.log('1');
      let newtmpparsedtodos = this.todos.filter((todo:any) => todo.completed === true)
      console.log(newtmpparsedtodos);
      // this.todos = newtmpparsedtodos;
    } else if (this.selectedOption === 'undone') {
      console.log('1');
      let newtmpparsedtodos = this.todos.filter((todo:any) => todo.completed === false)
      console.log(newtmpparsedtodos);
      // this.todos = newtmpparsedtodos;
    } else {
      console.log('3');
      console.log(tmpparsedtodos);
      // this.todos = tmpparsedtodos;
    }

  }


  handleDelete(event:any, id:any) {
    const index = this.todos.findIndex((todo:any) => todo.id === id);
    if(index > -1) {
      this.todos.splice(index,1);
    }
    localStorage.setItem('todos',JSON.stringify(this.todos));
  }

  handleDone(event:any, id:any){
    const index = this.todos.findIndex((todo:any) => todo.id === id);
    if(index > -1) {
      this.todos[index].completed = true;
    }
    localStorage.setItem('todos',JSON.stringify(this.todos));
  }

  handleUnDone(event:any, id:any){
     const index = this.todos.findIndex((todo:any) => todo.id === id);
    if(index > -1) {
      this.todos[index].completed = false;
    }
    localStorage.setItem('todos',JSON.stringify(this.todos));
  }

  logOut(event:any){
    localStorage.removeItem('todos');
    localStorage.removeItem('secureCookie');
    localStorage.removeItem('newtodo');
    this.router.navigate(['/']);
  }

  // addNew(event:any){
  //   this.router.navigate(['/add-todo']);
  // }

}

