import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-to-cart-snack',
  templateUrl: './add-to-cart-snack.component.html',
  styleUrls: ['./add-to-cart-snack.component.css']
})
export class AddToCartSnackComponent {
  snackBarRef = inject(MatSnackBarRef);
}
