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

    console.log('====================================');
    console.log('hyj');
    console.log('====================================');
    let tmpCookie:any = localStorage.getItem('secureCookie');
    let userCookie = JSON.parse(tmpCookie);
    
    if(userCookie=== null || typeof userCookie === 'undefined' || userCookie?.length === 0){
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    console.log('====================================');
    console.log('onDestroy');
    console.log('====================================');
  }
  
  priorityChange(event:any){
    // console.log('priorityChange',event.value);
    this.selectedOption = event.value;
  }

@Output() onCloseClick = new EventEmitter();
cancel(){
  this.onCloseClick.emit();
}

@Input() todos:any;
addNew(data:any, event:any){
  console.log('in add new todos', this.todos);

  console.log('addNew-data',data);
  console.log('addNew-prior',this.selectedOption);
  // data.todo, this.selectedOption

  // let tmptodos:any = localStorage.getItem('todos');
  // let userTodos = JSON.parse(tmptodos);
  // console.log('userTodos>>>', userTodos);
    
  let orderIdDec = this.todos.sort(function(a:any,b:any){
    return a.id - b.id
  });

  let lastTodoInArray = orderIdDec.pop();
  console.log('last-pop', lastTodoInArray);

  let counterId = lastTodoInArray.id + 1;
  console.log('counterId', counterId)
  let newToDo = {userId: lastTodoInArray.userId, id: counterId, title:data.todo, completed: false, new: true, priority: this.selectedOption};
  console.log('newToDo', newToDo)

  this.todos.unshift(newToDo);
  console.log('newUserTodos', this.todos)
  localStorage.setItem('todos',JSON.stringify(this.todos));
  this.onCloseClick.emit();
  }

}
