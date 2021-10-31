import { Injectable } from '@angular/core';
// @ts-ignore
import Web3 from 'web3';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public accountSubject = new Subject<string>();
  public account = '';
  public account$ = this.accountSubject.asObservable();

  private ethereum = window.ethereum;

  constructor(private web3: Web3,
              private router: Router) {}

  get isAuth(): boolean {
    return this.account !== '';
  }

  public init(): void {
    console.log('[AUTH] - Initialization');
    if (this.checkMetamask()) {
      this.ethereum.request({ method: 'eth_accounts' }).then((res: any) => {
        if (res[0]) {
          this.account = res[0];
          this.accountSubject.next(this.account);
          this.router.navigate(['/']);
        }
      });
    }
  }

  public connectMetamask(): void {
    if (this.checkMetamask()) {
      this.ethereum.request({ method: 'eth_requestAccounts' }).then((res: any) => {
        if (res[0]) {
          this.account = res[0];
          this.accountSubject.next(this.account);
          this.router.navigate(['/']);
        }
      });
    }
  }

  public disconnect(): void {
    this.ethereum.request({
      method: 'eth_requestAccounts',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      params: [{eth_accounts: {}}]
    }).then(() => {
      this.account = '';
      this.accountSubject.next(this.account);
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
}
