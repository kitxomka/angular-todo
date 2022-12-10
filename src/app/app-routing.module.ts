import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTodosComponent } from './add-todos/add-todos.component';
import { LoginComponent } from './login/login.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  { path: 'todos', component: TodosComponent },
  { path: 'add-todo', component: AddTodosComponent },
  { path: '', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
