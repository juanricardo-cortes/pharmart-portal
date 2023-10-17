import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-inventory-item-snack',
  templateUrl: './add-inventory-item-snack.component.html',
  styleUrls: ['./add-inventory-item-snack.component.css']
})
export class AddInventoryItemSnackComponent {
  snackBarRef = inject(MatSnackBarRef);
}
