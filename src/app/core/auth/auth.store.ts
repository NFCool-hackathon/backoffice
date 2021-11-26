import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  public accountSubject = new Subject<string>();
  public account = '';
  public account$ = this.accountSubject.asObservable();

  public isAdmin: boolean = false;
  public isMinter: boolean = false;

  constructor() {
  }
}
