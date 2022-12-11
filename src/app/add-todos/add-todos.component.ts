import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';


interface IPriority {
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
  priorityOptions: IPriority[] = [
    {value: 'high', viewValue: 'High'},
    {value: 'medium', viewValue: 'Medium'},
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
  
  priorityChange(value:string){
    this.selectedOption = value;
  }

@Output() onCloseClick = new EventEmitter();
cancel(){
  this.onCloseClick.emit();
}

@Input() todosList:any;
@Input() userId:any;
@Output() runFilters = new EventEmitter();
addNew(data:any, event:any){
  let tmpId = 0;
  for(let i = 0; i < this.todosList.length; i++) {
    tmpId = this.todosList[i].id > tmpId ? this.todosList[i].id : tmpId;
  }
  let newToDo = {userId: this.userId, id: tmpId, title:data.todo, completed: false, new: true, priority: this.selectedOption};
  this.todosList.unshift(newToDo);
  localStorage.setItem('todos',JSON.stringify(this.todosList));
  this.runFilters.emit();
  this.onCloseClick.emit();
  }

}
