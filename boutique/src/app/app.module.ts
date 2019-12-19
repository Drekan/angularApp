import { Ng5SliderModule } from 'ng5-slider';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProduitsComponent } from './produits/produits.component';
import { AuthentificationService} from './authentification.service';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PanierComponent } from './panier/panier.component';
import { FilterPipe } from './filter.pipe';
import { MinPipe } from './min.pipe';
import { MaxPipe } from './max.pipe';

const appRoutes: Routes = [
  { path: 'produits', component: ProduitsComponent },
  { path: 'login' , component: LoginComponent},
  { path: 'register' , component: RegistrationComponent},
  { path: 'panier' , component: PanierComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProduitsComponent,
    LoginComponent,
    RegistrationComponent,
    PanierComponent,
    FilterPipe,
    MinPipe,
    MaxPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    Ng5SliderModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [AuthentificationService],
  bootstrap: [AppComponent]
})

export class AppModule { }
