import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-token',
  templateUrl: './add-token.component.html',
  styleUrls: ['./add-token.component.scss']
})
export class AddTokenComponent implements OnInit {
  file: any;
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddTokenComponent>) { }

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
}
