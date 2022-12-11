import { Component } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

interface IRadioOptions {
  value: string;
  viewValue: string;
  checked: boolean;
}

interface ISelectOptions {
  value: string;
  viewValue: string;
}

interface ITodosList {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  new?: boolean;
  priority?: string;
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent {
  isAddModalVisible:boolean = false;
  todosList:ITodosList[] = [];
  filteredTodosList:ITodosList[] = [];
  userName:string = '';
  userId:number | undefined;
  filterBy:string | undefined = 'select-all';
  filterOptions:ISelectOptions[] = [
    { value: 'select-all', viewValue: 'All' },
    { value: 'done', viewValue: 'Done' },
    { value: 'undone', viewValue: 'Not done' },
    { value: 'new', viewValue: 'New' },
  ]; 
  selectedRadio:string | undefined = 'radio-all' ; 
  radioOptions:IRadioOptions[] = [
    { value: 'radio-all', viewValue: 'All', checked: true },
    { value: '5', viewValue: '5', checked: false },
    { value: '10', viewValue: '10', checked: false },
    { value: '20', viewValue: '20', checked: false },
  ];

  constructor(
    private _todoservie: FetchDataService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  openAddDialog(event?:any) {
    this.isAddModalVisible = true;
  }

  handleAddModalCancel() {
    this.isAddModalVisible = false;
  }

  getUsersTodos(id:number) {
    this._todoservie.fetchtodos(id).subscribe((res) => {
      localStorage.setItem('todos', JSON.stringify(res));
      let tmptodos:any = localStorage.getItem('todos');
      this.todosList = JSON.parse(tmptodos);
      this.filteredTodosList = JSON.parse(tmptodos);
    });
  }

  ngOnInit() {
    this.isAddModalVisible = false;
    let tmptodos:any = localStorage.getItem('todos');
    let tmpCookie:any = localStorage.getItem('secureCookie');
    let userCookie = JSON.parse(tmpCookie);
    this.userName = userCookie?.username;
    this.userId = userCookie?.userId;
    if (
      userCookie === null ||
      typeof userCookie === 'undefined' ||
      userCookie?.length === 0
    ) {
      this.router.navigate(['/']);
    } else {
      this.getUsersTodos(userCookie.id);
    }
  }

  ngAfterViewInit() {
    this.runFilters();
  }


  runFilters(formName?:string | undefined, value?:string | undefined) {
    if (formName === 'radio') {
      this.selectedRadio = value;
    }

    if (formName === 'dropdown') {
      this.filterBy = value;
    }

    this.filteredTodosList = this.getFilteredByRadio(
      this.getFilteredByDropdown(this.todosList)
    );
  }

  getFilteredByRadio(todosList:any) {
    if (this.selectedRadio === 'radio-all') {
      return todosList;
    } else {
      return todosList.slice(0, this.selectedRadio);
    }
  }

  getFilteredByDropdown(todosList:any) {
    switch (this.filterBy) {
      case 'selected-all':
        return todosList;
      case 'done':
        return todosList.filter((todoItem:any) => todoItem.completed);
      case 'undone':
        return todosList.filter((todoItem:any) => !todoItem.completed);
      case 'new':
        return todosList.filter((todoItem:any) => todoItem.new);
      default:
        return todosList;
    }
  }

  handleDelete(event:any, id:number | undefined) {
    const index = this.todosList?.findIndex((todo: any) => todo.id === id);
    if (index > -1) {
      this.todosList?.splice(index, 1);
    }
    localStorage.setItem('todos', JSON.stringify(this.todosList));
    this.runFilters();
  }

  handleEdite(event:any, id:number | undefined) {
    console.log(id);
    const index = this.todosList?.findIndex((todo: any) => todo.id === id);
    if (index > -1) {

    }
    localStorage.setItem('todos', JSON.stringify(this.todosList));
    this.runFilters();

  }

  handleDoneStatus(event:any, id:number | undefined) {
    const index = this.todosList?.findIndex((todo: any) => todo.id === id);
    if (index > -1) {
      this.todosList[index].completed = !this.todosList[index].completed;
    }
    localStorage.setItem('todos', JSON.stringify(this.todosList));
    this.runFilters();
  }

  logOut(event:any) {
    localStorage.removeItem('todos');
    localStorage.removeItem('secureCookie');
    localStorage.removeItem('newtodo');
    this.router.navigate(['/']);
  }
}
