import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { DashboardManagementComponent } from './core/dashboard-management/dashboard-management.component';
import { MarketplaceManagementComponent } from './core/marketplace-management/marketplace-management.component';
import { MarketplaceItemsComponent } from './core/marketplace-management/marketplace-items/marketplace-items.component';

import { MarketplaceItemsService } from './shared/services/marketplace-management/marketplace-items/marketplace-items.service';
import { HttpClientModule } from '@angular/common/http';
import { InventoryManagementComponent } from './core/inventory-management/inventory-management.component';
import { InventoryTableComponent } from './core/inventory-management/inventory-table/inventory-table.component';
import { AddInventoryItemComponent } from './core/inventory-management/add-inventory-item/add-inventory-item.component';
import { DialogContentService } from './shared/services/dialog-content/dialog-content.service';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { DataSharingService } from './shared/services/data-sharing.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DashboardManagementComponent,
    MarketplaceManagementComponent,
    MarketplaceItemsComponent,
    InventoryManagementComponent,
    InventoryTableComponent,
    AddInventoryItemComponent
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
    MarketplaceItemsService,
    DialogContentService,
    DataSharingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
