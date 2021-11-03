import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appDropzone]'
})
export class DropzoneDirective {

   @HostBinding('class.fileover') fileOver: boolean = false;
   @Output() fileDropped = new EventEmitter<any>();

  constructor() { }


  @HostListener('dragover', ['$event']) onDragOver(evt: { preventDefault: () => void; stopPropagation: () => void; }): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;

    console.log('Drag Over');
  }

  @HostListener('dragleave', ['$event']) onDragLeave(evt: { preventDefault: () => void; stopPropagation: () => void; }): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;

    console.log('Drag Leave');
  }

  @HostListener('drop', ['$event']) onDrop(evt: { preventDefault: () => void; stopPropagation: () => void; dataTransfer: { files: any[]; }; }): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;

    const file = evt.dataTransfer.files[0];

    this.fileDropped.emit(file);

    console.log('Drop file');
  }

}
