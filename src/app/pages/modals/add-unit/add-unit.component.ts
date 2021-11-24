import { Component, Inject, OnInit } from '@angular/core';
import { SmartContractService } from '../../../core/smart-contract.service';
import { SnackbarService } from '../../../core/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {LoadingService} from "../../../core/loading.service";

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.scss']
})
export class AddUnitComponent implements OnInit {
  nfcId = '';

  constructor(public dialogRef: MatDialogRef<AddUnitComponent>,
              @Inject(MAT_DIALOG_DATA) public tokenId: number,
              private smartContract: SmartContractService,
              private loadingService: LoadingService,
              private snackbar: SnackbarService) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  createTokenUnit(): void {
    if (this.tokenId >= 0) {
      this.loadingService.startLoading();
      this.smartContract.createTokenUnit(this.tokenId, this.nfcId).then(() => {
        this.snackbar.openSuccess('The unit has been minted');
        this.loadingService.stopLoading();
        this.closeDialog();
      })
        .catch(e => {
          this.loadingService.stopLoading();
          console.error(e);
          this.snackbar.openDanger(e);
        });
    }
  }
}
