import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './pages/auth/auth.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { TokensComponent } from './pages/tokens/tokens.component';
import Web3 from "web3";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    TokensComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [Web3],
  bootstrap: [AppComponent]
})
export class AppModule { }
