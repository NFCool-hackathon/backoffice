import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import Web3 from 'web3';

// @ts-ignore
import contractABI from '../../assets/abi/NFCool.json';
import { TokenModel } from '../models/token.model';
import { NftStorageService } from './nft-storage.service';
import { AuthStore } from './auth/auth.store';

import * as keccak256 from 'keccak256';

@Injectable({
  providedIn: 'root'
})
export class SmartContractService {
  private contract = new this.web3.eth.Contract(contractABI.abi, environment.contractAddress);

  constructor(private web3: Web3,
              private authStore: AuthStore,
              private nftStorage: NftStorageService) { }

  public async isMinter(account: string) {
    return await this.contract.methods.hasRole(keccak256('MINTER_ROLE'), account).call();
  }

  public async isAdmin(account: string) {
    return await this.contract.methods.hasRole(('0x00'), account).call();
  }

  public async getBrandName(): Promise<string> {
    return await this.contract.methods.getBrandName().call();
  }

  public async getToken(id: number): Promise<TokenModel> {
    return await this.contract.methods.tokenData(id).call();
  }

  public async getAllTokens(): Promise<TokenModel[]> {
    const tokensCount: number = await this.contract.methods.getTokensCount().call();
    const tokens: TokenModel[] = [];

    for (let i = 0 ; i < tokensCount ; i++) {
      const token: TokenModel = await this.getToken(i);
      tokens.push(token);
    }

    return tokens;
  }

  public async createToken(name: string, image: File) {
    const url = await this.nftStorage.uploadMetadata(image);
    await this.contract.methods.mintToken(url, name, this.web3.utils.fromAscii('')).send({ from: this.authStore.account });
  }

  public async createTokenUnit(tokenId: number, nfcId: string) {
    await this.contract.methods.mintTokenUnit(tokenId, nfcId, this.web3.utils.fromAscii('')).send({ from: this.authStore.account });
  }

  public async grantRole(role: string, account: string): Promise<void> {
    return await this.contract.methods.grantRole(keccak256(role), account).send({from: this.authStore.account});
  }

  public async revokeRole(role: string, account: string): Promise<void> {
    return await this.contract.methods.revokeRole(keccak256(role), account).send({from: this.authStore.account});
  }
}
