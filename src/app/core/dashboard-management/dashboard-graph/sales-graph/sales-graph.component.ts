import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { OrderItem } from 'src/app/shared/interfaces/item';
import { ItemManagementService } from 'src/app/shared/services/item-management/item-management.service';
import { OrderManagementService } from 'src/app/shared/services/order-management/order-management.service';

@Component({
  selector: 'app-sales-graph',
  templateUrl: './sales-graph.component.html',
  styleUrls: ['./sales-graph.component.css']
})
export class SalesGraphComponent implements OnInit{

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  data = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233];

  constructor(private orderManagementService: OrderManagementService,
    private itemManagementService: ItemManagementService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.initializeOrderList();
  }

  initializeChartOptions() {
    this.chartOptions = {
      chart: {
        width: 600,
      },
      title: {
        text: 'Sales per Month'
      },
      plotOptions: {
        line: {
            color: '#03dac5'
        }
      },
      yAxis: {
          title: {
              text: ''
          }
      },
      credits: {
        enabled: false
      },
      xAxis: {
        title: {
          text: 'Month'
        },
        categories: this.getMonths(),
        accessibility: {
            description: 'Months of the year'
        }
      },
      series: [
        {
          name: "Sales",
          type: 'line',
          data: this.data,
        },
      ],
    };

    this.cdr.detectChanges();
  }

  getMonths() : string[] {
    const currentDate = new Date();
    const monthsInWords : string[] = [];

    for (let i = 0; i < 12; i++) {
      const pastDate = new Date(currentDate);
      pastDate.setMonth(currentDate.getMonth() - i);

      const monthInWords = pastDate.toLocaleString('en-US', { month: 'short' });
      monthsInWords.push(monthInWords);
    }

    return monthsInWords.reverse();
  }

  initializeOrderList() {
    this.orderManagementService.orderList$.subscribe(
      (orders) => {
        this.getNumberOfOrders(orders);
      }
    )
  }

  getNumberOfOrders(orders: OrderItem[]) {
    const currentDate = new Date();
    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setMonth(oneYearAgo.getMonth() - 12);
    oneYearAgo.setDate(1);

    const orderCounts: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];

    const filteredOrders = orders.filter((order) => {
      var orderDate = new Date(order.createdAt);
      if (orderDate >= oneYearAgo) {
        return order;
      }
      return null;
    });

    for (var i=0; i < filteredOrders.length; i++) {
      this.itemManagementService.itemList$.subscribe((items) => {
        var item = items.find(x => x._id === filteredOrders[i].itemId);
        if (item) {
          var orderDate = new Date(filteredOrders[i].createdAt);
          const monthDiff = Math.abs(currentDate.getMonth() - orderDate.getMonth());
          orderCounts[11 - monthDiff] += item.price * filteredOrders[i].quantity;
        }
      });
    }

    this.data = orderCounts;
    this.initializeChartOptions();
  }
}
