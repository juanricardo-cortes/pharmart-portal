import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-inventory-snack',
  templateUrl: './delete-inventory-snack.component.html',
  styleUrls: ['./delete-inventory-snack.component.css']
})
export class DeleteInventorySnackComponent {
  snackBarRef = inject(MatSnackBarRef);
}
