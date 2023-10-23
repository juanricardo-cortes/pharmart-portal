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
import { MatSnackBar, MatSnackBarRef, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

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
import { AuthManagementService } from './shared/services/auth-management/auth-management.service';
import { UserManagementService } from './shared/services/user-management/user-management.service';
import { WebSocketService } from './shared/services/web-socket/web-socket.service';
import { AddInventoryItemSnackComponent } from './core/inventory-management/add-inventory-item/add-inventory-item-snack/add-inventory-item-snack.component';
import { DeleteInventorySnackComponent } from './core/inventory-management/delete-inventory-item/delete-inventory-snack/delete-inventory-snack.component';
import { UpdateInventorySnackComponent } from './core/inventory-management/update-inventory-item/update-inventory-snack/update-inventory-snack.component';
import { AddToCartSnackComponent } from './core/marketplace-management/marketplace-items/add-to-cart-snack/add-to-cart-snack.component';
import { DashboardCardsComponent } from './core/dashboard-management/dashboard-cards/dashboard-cards.component';
import { DashboardTableComponent } from './core/dashboard-management/dashboard-table/dashboard-table.component';
import { DashboardGraphComponent } from './core/dashboard-management/dashboard-graph/dashboard-graph.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { SellersCardComponent } from './core/dashboard-management/dashboard-cards/sellers-card/sellers-card.component';
import { OrdersCardComponent } from './core/dashboard-management/dashboard-cards/orders-card/orders-card.component';
import { SalesCardComponent } from './core/dashboard-management/dashboard-cards/sales-card/sales-card.component';
import { OrderManagementService } from './shared/services/order-management/order-management.service';
import { OrderTrackerService } from './shared/services/order-tracker-management/order-tracker.service';
import { CartManagementService } from './shared/services/cart-management/cart-management.service';
import { SalesGraphComponent } from './core/dashboard-management/dashboard-graph/sales-graph/sales-graph.component';
import { OrdersGraphComponent } from './core/dashboard-management/dashboard-graph/orders-graph/orders-graph.component';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    CartTableComponent,
    AddInventoryItemSnackComponent,
    DeleteInventorySnackComponent,
    UpdateInventorySnackComponent,
    AddToCartSnackComponent,
    DashboardCardsComponent,
    DashboardTableComponent,
    DashboardGraphComponent,
    SellersCardComponent,
    OrdersCardComponent,
    SalesCardComponent,
    SalesGraphComponent,
    OrdersGraphComponent
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
    HttpClientModule,
    MatSnackBarModule,
    HighchartsChartModule,
    MatDividerModule,
    FlexLayoutModule
  ],
  providers: [
    ItemManagementService,
    AuthManagementService,
    UserManagementService,
    OrderManagementService,
    OrderTrackerService,
    WebSocketService,
    CartManagementService,
    DialogContentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
