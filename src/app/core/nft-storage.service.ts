import { Injectable } from '@angular/core';
import {nftStorageKey} from "../../../keys";

@Injectable({
  providedIn: 'root'
})
export class NftStorageService {

  constructor() {
  }

  public async uploadMetadata(file: File): Promise<string> {
    const response = await fetch('https://api.nft.storage/upload', {
      method: 'POST',
      body: file,
      headers: {'Authorization': 'Bearer ' + nftStorageKey}
    });

    const data = await response.json();
    console.log(data);

    return 'ipfs://' + data.value.cid;
  }
}
