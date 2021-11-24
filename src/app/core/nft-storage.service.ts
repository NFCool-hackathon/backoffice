import { Injectable } from '@angular/core';
import {nftStorageKey} from "../../../keys";
import {AngularFireFunctions} from "@angular/fire/compat/functions";
import Web3 from "web3";
import {AuthStore} from "./auth/auth.store";

@Injectable({
  providedIn: 'root'
})
export class NftStorageService {
  constructor(private cloudFunctions: AngularFireFunctions,
              private web3: Web3,
              private authStore: AuthStore) {
  }

  public async uploadMetadata(file: File): Promise<string> {
    const response = await fetch('https://api.nft.storage/upload', {
      method: 'POST',
      body: file,
      headers: { Authorization: 'Bearer ' + nftStorageKey }
    });

    const data = await response.json();
    console.log(data);

    return 'https://' + data.value.cid + '.ipfs.dweb.link';
  }

  public async isMinter(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const sha = this.web3.utils.sha3('signature');
      if (sha) {
        this.web3.eth.sign(sha, this.authStore.account, (err, signature) => {
          const callable = this.cloudFunctions.httpsCallable('uploadImageOnIPFS');
          const obs = callable({signature: this.web3.utils.sha3('signature')});

          obs.subscribe(res => {
              console.log('isMinter : ' + res);
              return res as boolean;
            },
            error => {
              console.error(error);
              reject(error)
            });
        });
      }
    });
  }
}
