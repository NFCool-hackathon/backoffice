import { Component, OnInit } from '@angular/core';
import { SmartContractService } from '../../core/smart-contract.service';
import { TokenModel } from '../../models/token.model';
import { MatDialog } from '@angular/material/dialog';
import { AddTokenComponent } from '../modals/add-token/add-token.component';
import { AddUnitComponent } from '../modals/add-unit/add-unit.component';
import firebase from "firebase/compat";
import {AuthStore} from "../../core/auth/auth.store";

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss']
})
export class TokensComponent implements OnInit {
  tokens: TokenModel[] = [];

  brandName: string = '';

  isMinter = false;

  constructor(private sc: SmartContractService,
              private authStore: AuthStore,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initTokens();
  }

  initTokens(): void {
    this.sc.getAllTokens().then(res => {
      this.tokens = res;
      console.log(this.tokens);
    });

    this.sc.getBrandName().then(name => {
      this.brandName = name;
    });

    this.isMinter = this.authStore.isMinter;
  }

  openModal() {
    this.dialog.open(AddTokenComponent).afterClosed().subscribe(() => {
      this.initTokens();
    });
  }

  openAddUnitModal(id: number) {
    this.dialog.open(AddUnitComponent, {
      data: id
    });
  }
}
