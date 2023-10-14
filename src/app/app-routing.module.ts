import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardManagementComponent } from './core/dashboard-management/dashboard-management.component';
import { MarketplaceManagementComponent } from './core/marketplace-management/marketplace-management.component';
import { InventoryManagementComponent } from './core/inventory-management/inventory-management.component';
import { LoginUserComponent } from './core/user-management/login-user/login-user.component';

const routes: Routes = [
  { path: '', component: LoginUserComponent },
  { path: 'marketplace', component: MarketplaceManagementComponent },
  { path: 'inventory', component: InventoryManagementComponent},
  { path: 'dashboard', component: DashboardManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
