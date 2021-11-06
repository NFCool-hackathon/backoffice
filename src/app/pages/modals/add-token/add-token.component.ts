import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../../core/snackbar.service";
import {SmartContractService} from "../../../core/smart-contract.service";

@Component({
  selector: 'app-add-token',
  templateUrl: './add-token.component.html',
  styleUrls: ['./add-token.component.scss']
})
export class AddTokenComponent implements OnInit {
  file: any;
  tokenName: string = '';
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddTokenComponent>,
              private snackbar: SnackbarService,
              private smartContract: SmartContractService) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onFileChange(event: Event): void{
    // @ts-ignore
    this.file = event.target.files[0];
  }

  deleteFile(): void {
    this.file = null;
  }

  onFileDropped(file: any): void {
    this.file = file;
  }

  async createToken() {
    if (!this.file || !this.tokenName) {
      this.snackbar.openDanger('You need to fill all information');
      console.error('You need to fill all information');
    } else {
      this.smartContract.createToken(this.tokenName, this.file);
    }
  }
}
