import { Component } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';
import {Router} from '@angular/router';
import {MatDialog} from "@angular/material/dialog";



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
  isAddModalVisible:boolean = false;
  todos:any; // todosList
  filteredTodos: any; // filteredTodosList
  userName:any;
  userId: any;
  selectedOption:string = 'select-all';  // selectedCategoryOption, todo rename on ui too
  selectOptions: SelectOptions[] = [
    {value: 'select-all', viewValue: 'All'},
    {value: 'done', viewValue: 'Done'},
    {value: 'undone', viewValue: 'Not done'},
    {value: 'new', viewValue: 'New'}
  ]; // categoryOptionList
  selectedRadio:string = 'radio-all';  // selectedCategoryOption,
  radioOptions: RadioOptions[] = [
    {value: 'radio-all', viewValue: 'All', "checked": true},
    {value: '5', viewValue: '5', "checked": false},
    {value: '10', viewValue: '10', "checked": false},
    {value: '20', viewValue: '20', "checked": false}
  ];


  constructor(private _todoservie:FetchDataService, private router: Router, private dialog: MatDialog){}

  openDialog(event:any) {
    this.isAddModalVisible = true;
  }

  closeDialog(){
    this.isAddModalVisible = false;
  }

  handleAddModalCancel() {
    this.isAddModalVisible = false;
  }

  getUsersTodos(id:any){
    this._todoservie.fetchtodos(id).subscribe(res => {
      localStorage.setItem('todos',JSON.stringify(res));
      let tmptodos:any = localStorage.getItem('todos');
      // console.log('tmptodos>>>', tmptodos);
      this.todos = JSON.parse(tmptodos);
      this.filteredTodos = JSON.parse(tmptodos);
          // this.todos.changeVar.subscribe(message => {
    
    })
  }

  ngOnInit(){
    this.isAddModalVisible = false;
    let tmptodos:any = localStorage.getItem('todos');
    let tmpCookie:any = localStorage.getItem('secureCookie');
    let userCookie = JSON.parse(tmpCookie);
    this.userName = userCookie?.username;
    this.userId = userCookie?.userId;
    if(userCookie=== null || typeof userCookie === 'undefined' || userCookie?.length === 0){
      this.router.navigate(['/']);
    } else {
      this.getUsersTodos(userCookie.id);
    }
  }

  ngAfterViewInit() {
    console.log('>>> ngAfterViewInit');
    this.runFilters();
  }

  ngOnChanges(isAddModalVisible: any) {
    console.log('>>>>', isAddModalVisible);
  }

  runFilters(formName?: any, value?: any) {
    if(formName === 'radio') {
      this.selectedRadio = value;
    }

    if(formName === 'dropdown') {
      this.selectedOption = value;
    }

    this.filteredTodos = this.getFilteredByRadio(this.getFilteredByDropdown(this.todos));
  }

  getFilteredByRadio(todosList: any) {
    if(this.selectedRadio === 'radio-all') {
      return todosList;
    } else {
      return todosList.slice(0, this.selectedRadio);
    }
  }

  getFilteredByDropdown(todosList: any) {
    console.log('>>> todosList: ', todosList);
    switch(this.selectedOption){
      case 'selected-all': return todosList;
      case 'done': return todosList.filter((todoItem:any) => todoItem.completed);
      case 'undone': return todosList.filter((todoItem:any) => !todoItem.completed);
      case 'new': return todosList.filter((todoItem:any) => todoItem.new);
      default:
        return todosList;
    }
  }

  handleDelete(event:any, id:any) {
    const index = this.todos.findIndex((todo:any) => todo.id === id);
    if(index > -1) {
      this.todos.splice(index,1);
    }
    localStorage.setItem('todos',JSON.stringify(this.todos));
    this.runFilters();
  }

  handleDone(event:any, id:any){
    const index = this.todos.findIndex((todo:any) => todo.id === id);
    if(index > -1) {
      this.todos[index].completed = !this.todos[index].completed;
    }
    localStorage.setItem('todos',JSON.stringify(this.todos));
    this.runFilters();
  }

  logOut(event:any){
    localStorage.removeItem('todos');
    localStorage.removeItem('secureCookie');
    localStorage.removeItem('newtodo');
    this.router.navigate(['/']);
  }

}

