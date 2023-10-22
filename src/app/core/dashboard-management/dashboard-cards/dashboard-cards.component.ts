import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.css']
})
export class DashboardCardsComponent {

  constructor() { }

  ngOnInit() {
    const div = document.getElementById('card-grid');
    const width = 410 * 3;
    
    if (div) {
      div.style.width = width.toString() + 'px';
    }
  }
}
