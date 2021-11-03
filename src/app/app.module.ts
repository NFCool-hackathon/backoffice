import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './pages/auth/auth.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { TokensComponent } from './pages/tokens/tokens.component';
import Web3 from 'web3';
import { AddTokenComponent } from './pages/modals/add-token/add-token.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    TokensComponent,
    AddTokenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [Web3],
  bootstrap: [AppComponent]
})
export class AppModule { }
