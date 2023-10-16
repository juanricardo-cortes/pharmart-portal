import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { DashboardManagementComponent } from './core/dashboard-management/dashboard-management.component';
import { MarketplaceManagementComponent } from './core/marketplace-management/marketplace-management.component';
import { MarketplaceItemsComponent } from './core/marketplace-management/marketplace-items/marketplace-items.component';

import { HttpClientModule } from '@angular/common/http';
import { InventoryManagementComponent } from './core/inventory-management/inventory-management.component';
import { InventoryTableComponent } from './core/inventory-management/inventory-table/inventory-table.component';
import { AddInventoryItemComponent } from './core/inventory-management/add-inventory-item/add-inventory-item.component';
import { DialogContentService } from './shared/services/dialog-content/dialog-content.service';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ItemManagementService } from './shared/services/item-management/item-management.service';
import { DeleteInventoryItemComponent } from './core/inventory-management/delete-inventory-item/delete-inventory-item.component';
import { UpdateInventoryItemComponent } from './core/inventory-management/update-inventory-item/update-inventory-item.component';
import { UserManagementComponent } from './core/user-management/user-management.component';
import { LoginUserComponent } from './core/user-management/login-user/login-user.component';
import { CartManagementComponent } from './core/cart-management/cart-management.component';
import { LandingPageComponent } from './core/landing-page/landing-page.component';
import { CartTableComponent } from './core/cart-management/cart-table/cart-table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DashboardManagementComponent,
    MarketplaceManagementComponent,
    MarketplaceItemsComponent,
    InventoryManagementComponent,
    InventoryTableComponent,
    AddInventoryItemComponent,
    DeleteInventoryItemComponent,
    UpdateInventoryItemComponent,
    UserManagementComponent,
    LoginUserComponent,
    CartManagementComponent,
    LandingPageComponent,
    CartTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatPaginatorModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ItemManagementService,
    DialogContentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
