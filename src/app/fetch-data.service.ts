import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  constructor(private _http:HttpClient) { }

  fetchusers(){
    return this._http.get('https://jsonplaceholder.typicode.com/users');
  }

  fetchtodos(id:any){
    return this._http.get('https://jsonplaceholder.typicode.com/todos?userId='+ id);
  }

}
