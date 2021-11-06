import { Component, OnInit } from '@angular/core';
import { SmartContractService } from '../../core/smart-contract.service';
import { TokenModel } from '../../models/token.model';
import { MatDialog } from '@angular/material/dialog';
import { AddTokenComponent } from '../modals/add-token/add-token.component';
import {AddUnitComponent} from "../modals/add-unit/add-unit.component";

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss']
})
export class TokensComponent implements OnInit {
  tokens: TokenModel[] = [];

  constructor(private sc: SmartContractService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.sc.getAllTokens().then(res => {
      this.tokens = res;
      console.log(this.tokens);
    });
  }

  openModal() {
    this.dialog.open(AddTokenComponent);
  }

  openAddUnitModal(id: number) {
    this.dialog.open(AddUnitComponent, {
      data: id,
    });
  }
}
