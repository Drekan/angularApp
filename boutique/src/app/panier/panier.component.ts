import { Component, OnInit } from '@angular/core';
import {PanierService } from '../panier.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

	produits: any;
	totalPrice : number;

  constructor(private service : PanierService,private router: Router) { }

  ngOnInit() {
  	this.totalPrice = 0;
  	this.service.getPanier().subscribe(res=>{
  		if(res[0]==undefined)
  			this.produits=[];
  		else
  			this.produits=res[0]["produits"];
  		console.log(this.produits);
  	});
  }

  add(name,price){
  	this.service.addPanier(name,price).subscribe(res=>{

  	});
  }

  deletePanier(){
  	alert("Votre commande a été effectuée.");
  	this.service.deletePanier().subscribe(res=>{
  		this.router.navigate(['/produits']);
  	});
  	
  }

  increment(price){
  	this.totalPrice+=price;
  }

  getTotalPrice(){
  	return this.totalPrice;
  }


}
