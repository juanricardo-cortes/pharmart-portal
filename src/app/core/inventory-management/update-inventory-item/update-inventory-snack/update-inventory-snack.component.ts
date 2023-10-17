import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-inventory-snack',
  templateUrl: './update-inventory-snack.component.html',
  styleUrls: ['./update-inventory-snack.component.css']
})
export class UpdateInventorySnackComponent {
  snackBarRef = inject(MatSnackBarRef);
}
