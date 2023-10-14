import { Component } from '@angular/core';
import { ItemManagementService } from './shared/services/item-management/item-management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private itemManagementService: ItemManagementService) {}

  ngOnInit() {
    this.itemManagementService.fetchData();
  }
}
