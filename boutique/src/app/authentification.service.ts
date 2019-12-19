import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {User} from './users';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

	userConnected : User = null;//{ pseudo : 'Jean-Bernard', password : '1234'};

  constructor(private http : HttpClient,private router : Router) { }


  getCurrentUser(){
    return this.userConnected;
  }


  connexion(username,password){
    return this.http.get(`http://localhost:7777/login/${username}/${password}`)
  }

  registration(username,password,email){
    return this.http.get(`http://localhost:7777/register/${username}/${password}/${email}`)
  }

  deconnexion(){
    this.userConnected = undefined;
    this.router.navigate(['/login']);
  }

  setUser(user : User){
    this.userConnected = user;
  }

  isConnected(){
    return (this.userConnected != undefined)
  }


}
