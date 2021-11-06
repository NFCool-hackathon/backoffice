import {Component, Inject, Input, OnInit} from '@angular/core';
import {SmartContractService} from "../../../core/smart-contract.service";
import {SnackbarService} from "../../../core/snackbar.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.scss']
})
export class AddUnitComponent implements OnInit {

  loading = false;
  nfcId = '';

  constructor(public dialogRef: MatDialogRef<AddUnitComponent>,
              @Inject(MAT_DIALOG_DATA) public tokenId: number,
              private smartContract: SmartContractService,
              private snackbar: SnackbarService) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  createTokenUnit(): void {
    if (this.tokenId) {
      this.loading = true;
      this.smartContract.createTokenUnit(this.tokenId, this.nfcId).then(() => {
        this.snackbar.openSuccess('The unit has been minted');
        this.loading = false;
        this.closeDialog();
      })
      .catch(e => {
        this.loading = false;
        console.error(e);
        this.snackbar.openDanger(e);
      });
    }
  }

}
