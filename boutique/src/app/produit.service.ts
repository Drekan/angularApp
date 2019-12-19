//import { Produits } from './produits';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http : HttpClient) { 

  }

  getProduits(){
  	return this.http.get('http://localhost:7777/produits');
  }

  getProduitsFiltre(name,min,max){
  	return this.http.get(`http://localhost:7777/produits/${name}/${min}/${max}`);
  }

}
