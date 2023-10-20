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
    if (div) {
      const width = 410 * 3;
      div.style.width = width.toString() + 'px';
    }
  }
}
