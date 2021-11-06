import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import Web3 from 'web3';

declare let window: any;

// @ts-ignore
import contractABI from '../../assets/abi/NFCool.json';
import { AuthService } from './auth/auth.service';
import { TokenModel } from '../models/token.model';
import {NftStorageService} from "./nft-storage.service";

@Injectable({
  providedIn: 'root'
})
export class SmartContractService {
  private contract = new this.web3.eth.Contract(contractABI.abi, environment.contractAddress);
  private ethereum = window.ethereum;

  constructor(private web3: Web3,
              private _auth: AuthService,
              private nftStorage: NftStorageService) { }

  public async getAllTokens(): Promise<TokenModel[]> {
    const tokens = await this.contract.methods.getAllTokens().call();

    return tokens as TokenModel[];
  }

  public async createToken(name: string, image: File) {
    const url = await this.nftStorage.uploadMetadata(image);
    await this.contract.methods.mintToken(url, name, this.web3.utils.fromAscii('')).send({from: this._auth.account});
  }
}
