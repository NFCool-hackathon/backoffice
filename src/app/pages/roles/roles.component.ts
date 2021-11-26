import { Component, OnInit } from '@angular/core';
import {SmartContractService} from "../../core/smart-contract.service";
import {SnackbarService} from "../../core/snackbar.service";
import {AuthStore} from "../../core/auth/auth.store";

export interface Role {
  to: string,
  role: '0x00' | 'MINTER_ROLE' | 'SUPPLIER_ROLE' | 'SELLER_ROLE';
}

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  roleOptions = [{role: '0x00', display: 'Admin'} , {role: 'MINTER_ROLE', display: 'Minter'} , {role: 'SUPPLIER_ROLE', display: 'Supplier'} , {role: 'SELLER_ROLE', display: 'Seller'}];

  giveRole: Role = {
    to: '',
    role: '0x00'
  }

  revokeRole: Role = {
    to: '',
    role: '0x00'
  }

  brandName = '';

  isAdmin = false;

  constructor(private sc: SmartContractService,
              private authStore: AuthStore,
              private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.sc.getBrandName().then(name => {
      this.brandName = name;
    });

    this.isAdmin = this.authStore.isAdmin;
  }

  giveRoleToAccount() {
    this.sc.grantRole(this.giveRole.role, this.giveRole.to).then(() => {
      this.snackbar.openSuccess('The role has been given');
    }).catch(e => {
      console.error(e);
      this.snackbar.openDanger(e);
    });
  }

  revokeRoleToAccount() {
    console.log(this.revokeRole)
    this.sc.revokeRole(this.revokeRole.role, this.revokeRole.to).then(() => {
      this.snackbar.openSuccess('The role has been revoked');
    }).catch(e => {
      console.error(e);
      this.snackbar.openDanger(e);
    });
  }
}
