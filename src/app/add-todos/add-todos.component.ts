import { Component, EventEmitter, Output, Input } from '@angular/core';


import { FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

interface Priority {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-add-todos',
  templateUrl: './add-todos.component.html',
  styleUrls: ['./add-todos.component.css']
})

export class AddTodosComponent {

  newToDoForm:any = FormGroup;
  selectedOption:string = 'Hight';
  priorityOptions: Priority[] = [
    {value: 'high', viewValue: 'High'},
    {value: 'med', viewValue: 'Medium'},
    {value: 'low', viewValue: 'Low'},
  ]

  constructor(private router: Router) { 
    
    this.newToDoForm = new FormGroup({
      todo: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(){
    let tmpCookie:any = localStorage.getItem('secureCookie');
    let userCookie = JSON.parse(tmpCookie);
    this.selectedOption = 'low';
    
    if(userCookie=== null || typeof userCookie === 'undefined' || userCookie?.length === 0){
      this.router.navigate(['/']);
    }
  }
  
  priorityChange(event:any){
    console.log('priorityChange',event.value);
    this.selectedOption = event.value;
  }

@Output() onCloseClick = new EventEmitter();
cancel(){
  this.onCloseClick.emit();
}

@Input() todos:any;
@Input() userId:any;
addNew(data:any, event:any){
  console.log('in add new todos', this.todos);

  console.log('addNew-data',data);
  console.log('addNew-prior',this.selectedOption);
    
  let tmpId = 0;
  for(let i = 0; i < this.todos.length; i++) {
    tmpId = this.todos[i].id > tmpId ? this.todos[i].id : tmpId;
  }
  
  let newToDo = {userId: this.userId, id: tmpId, title:data.todo, completed: false, new: true, priority: this.selectedOption};
  console.log('newToDo', newToDo)

  this.todos.unshift(newToDo);
  console.log('newUserTodos', this.todos)
  localStorage.setItem('todos',JSON.stringify(this.todos));
  this.onCloseClick.emit();
  }

}
