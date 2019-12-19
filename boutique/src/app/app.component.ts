import { Component } from '@angular/core';
import { AuthentificationService} from './authentification.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth : AuthentificationService,
  				private router: Router
  				){}

  title = "Boutique.com"
  description = "-99% tous les 5e Dimanches du mois !"


  userConnected = this.auth.getCurrentUser();

  ngOnInit(){
  	
  }

}
