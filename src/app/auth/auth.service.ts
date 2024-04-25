import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  strtoken: String;
  helloworld() {
    return this.http.post<JSON>('http://localhost:8080/hello', {   });
  }

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<JSON>('http://localhost:8080/authenticate', { username, password });
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if(!token || token==''){
      return false;
    }
      
    const isexpired = this.tokenExpired(""+token)
    //const user=this.currentUser(""+token)
    if (isexpired) {
    return false;
    }
    else{
      return true;
    }
    
  }
  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
  public currentUser() {
    const token = localStorage.getItem('token');
    this.strtoken=""+token;
    const user = (JSON.parse(atob(this.strtoken.split('.')[1]))).sub;
    return user;
  }
}