import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthentificationService} from '../authentification.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
	registerForm;
  constructor(private authService: AuthentificationService,
    private formBuilder: FormBuilder,
    private router: Router) { 
  	this.registerForm = this.formBuilder.group({
   			userId: '',
      		password: '',
      		emailAddress: ''
    });}

  ngOnInit() {
  }

  onSubmit(userData){
  	this.authService.registration(userData["userId"],userData["password"],userData["emailAddress"]).subscribe(res=>{
  		if(res != undefined)
    		this.router.navigate(['/login']);
  	});

  	this.registerForm.reset();

  }

}
