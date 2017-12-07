import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: Http) { }

  //Function to Register the user
  //Reach into our backend API, to make a post request 
  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('users/register', user,{headers: headers})
    .map(res => res.json());
  }

  //Just like above making a post request to the backend 
  //With the user object which holds username and password 
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('users/authenticate', user,{headers: headers})
    .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    //Sending the token with the request to the end point
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('users/profile', {headers: headers})
    .map(res => res.json());
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  storeUserData(token, user){

      localStorage.setItem('id_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      this.authToken = token;
      this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }
}
