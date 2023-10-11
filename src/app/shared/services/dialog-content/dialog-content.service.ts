import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class DialogContentService {
  constructor(private dialog: MatDialog) {}

  openDialog(component: any, options: any = {}) {
    return this.dialog.open(component, options);
  }
}
