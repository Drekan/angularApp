import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthentificationService} from '../authentification.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	authForm;
	user;

  constructor(
  	private authService: AuthentificationService,
    private formBuilder: FormBuilder,
    private router: Router
    ) {
  		this.authForm = this.formBuilder.group({
   			userId: '',
      		password: ''
    });
   }

  ngOnInit() {
  }

   onSubmit(userData) {
    // Process checkout data here
    console.warn('Inscription submit : ', userData);
    this.authService.connexion(userData["userId"],userData["password"]).subscribe(res=>{
    	if(res != null){
        this.user = {pseudo : res["userId"]};
      	console.log(res["userId"])
      	this.authService.setUser(this.user);
        this.router.navigate(['/produits']);
      }
      else{
        alert("Mauvaise combinaison nom d'utilisateur / mot de passe. :(");
      }
      


    })
    //this.user = this.authService.clearUser();
    
    this.authForm.reset();
  }

}
