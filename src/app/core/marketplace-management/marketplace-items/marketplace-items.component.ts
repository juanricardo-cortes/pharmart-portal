import { Component, HostListener, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/interfaces/Item';
import { ItemManagementService } from 'src/app/shared/services/item-management/item-management.service';

@Component({
  selector: 'app-marketplace-items',
  templateUrl: './marketplace-items.component.html',
  styleUrls: ['./marketplace-items.component.css']
})
export class MarketplaceItemsComponent implements OnInit {

  items?: Item[];
  cols: number = 1;

  constructor(private itemManagementService: ItemManagementService) {}

  ngOnInit() {
    this.updateCols();
    this.itemManagementService.getData().subscribe(
      (response) => {
        console.log(response);
        this.items = response;
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateCols();
  }

  updateCols(): void {
    const screenWidth = window.innerWidth;
    this.cols = (screenWidth / 410) | 0;
  }
}
