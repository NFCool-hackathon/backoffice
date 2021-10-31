import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import Web3 from 'web3';

// @ts-ignore
import contractABI from '../../assets/abi/NFCool.json';
import {AuthService} from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SmartContractService {

  private contract = new this.web3.eth.Contract(contractABI.abi, environment.contractAddress);

  constructor(private web3: Web3,
              private _auth: AuthService) { }

}
