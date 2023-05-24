import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  register(payload: any){
    return this.http.post('http://localhost:4000/register', payload);
  }

  login(payload: any){
    return this.http.post('http://localhost:4000/auth', payload, {withCredentials: true});
  }

  getUsers(){
    return this.http.get('http://localhost:4000/users');
  }

  logout(){
    return this.http.get('http://localhost:4000/logout',{withCredentials: true});
  }

  refresh(){
    return this.http.get('http://localhost:4000/refresh', {withCredentials: true});
  }
}