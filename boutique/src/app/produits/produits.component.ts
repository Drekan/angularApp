import { Component, OnInit } from '@angular/core';
import { Produit } from '../produits';
import {ProduitService } from '../produit.service';
import {PanierService } from '../panier.service';
import { AuthentificationService} from '../authentification.service';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  value: number = 0;
  highValue: number = 50;
  options: Options = {
    floor: 0,
    ceil: 50
  };

	produits : any;

	selected : Produit = undefined;


	onSelect(produit : Produit){
		this.selected = produit;
	}

  constructor(
    private service : ProduitService,
    private panier : PanierService,
    private authentification : AuthentificationService) { 
  
    }


  ngOnInit() {
  	this.service.getProduits().subscribe(res=>{
  		this.produits=res;
  	});
  }

  addPanier(title,price){
    console.log("SENT");
    this.panier.addPanier(title,price).subscribe(res=>{
      
    });
  }

}
