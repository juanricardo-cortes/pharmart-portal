import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardManagementComponent } from './core/dashboard-management/dashboard-management.component';
import { MarketplaceManagementComponent } from './core/marketplace-management/marketplace-management.component';
import { InventoryManagementComponent } from './core/inventory-management/inventory-management.component';

const routes: Routes = [
  { path: '', component: DashboardManagementComponent },
  { path: 'marketplace', component: MarketplaceManagementComponent },
  { path: 'inventory', component: InventoryManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
