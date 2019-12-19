import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthentificationService} from './authentification.service';
import {User} from './users';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  constructor(private http : HttpClient, private authService: AuthentificationService) { }

  getPanier(){
  	let user = this.authService.getCurrentUser();
  	if(user!=undefined)
  		return this.http.get(`http://localhost:7777/panier/${user.pseudo}`);
  }

  addPanier(name,price){
  	let user = this.authService.getCurrentUser();
  	if(user!=undefined){
  		console.log("service : OK " + user.pseudo + " " + name + " " + price);
  		return this.http.get(`http://localhost:7777/addpanier/${user.pseudo}/${name}/${price}`);
  	}
  }

  deletePanier(){
  	let user = this.authService.getCurrentUser();
  	return this.http.get(`http://localhost:7777/delpanier/${user.pseudo}`);
  }
}
