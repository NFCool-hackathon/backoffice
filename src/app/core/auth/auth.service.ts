import { Injectable } from '@angular/core';
// @ts-ignore
import Web3 from 'web3';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import {SmartContractService} from "../smart-contract.service";
import {AuthStore} from "./auth.store";

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ethereum = window.ethereum;

  constructor(private web3: Web3,
              private router: Router,
              private smartcontract: SmartContractService,
              private authStore: AuthStore) {}

  get isAuth(): boolean {
    return this.authStore.account !== '';
  }

  public init(): void {
    console.log('[AUTH] - Initialization');
    if (this.checkMetamask()) {
      this.ethereum.request({ method: 'eth_accounts' }).then((res: any) => {
        if (res[0]) {
          this.verifyAndAppendAccount(res[0]);
        }
      });
    }
  }

  public connectMetamask(): void {
    if (this.checkMetamask()) {
      this.ethereum.request({ method: 'eth_requestAccounts' }).then((res: any) => {
        if (res[0]) {
          this.verifyAndAppendAccount(res[0]);
        }
      });
    }
  }

  public disconnect(): void {
    this.ethereum.request({
      method: 'eth_requestAccounts',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      params: [{ eth_accounts: {} }]
    }).then(() => {
      this.authStore.account = '';
      this.authStore.accountSubject.next(this.authStore.account);
      this.router.navigate(['/login']);
    });
  }

  private checkMetamask(): boolean {
    if (this.ethereum) {
      console.log('[AUTH] - METAMASK is installed');
      this.web3.setProvider(this.ethereum);
      return true;
    } else {
      console.error('[AUTH] - METAMASK is not installed');
      return false;
    }
  }

  private async verifyAndAppendAccount(account: string) {
    if (account) {
      const isMinter = await this.smartcontract.isMinter(account);
      if (isMinter) {
        console.log('[AUTH] Account is minter');
        this.authStore.account = account;
        this.authStore.accountSubject.next(account);
        this.router.navigate(['/']);
        console.log('[AUTH] METAMASK connected with account ' + account);
      } else {
        console.error('[AUTH] Account is not minter');
        alert('You\'re not the minter of the contract');
      }
    }
  }
}
