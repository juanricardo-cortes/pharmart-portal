import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { OrderItem } from 'src/app/shared/interfaces/item';
import { ItemManagementService } from 'src/app/shared/services/item-management/item-management.service';
import { OrderManagementService } from 'src/app/shared/services/order-management/order-management.service';

@Component({
  selector: 'app-sales-card',
  templateUrl: './sales-card.component.html',
  styleUrls: ['./sales-card.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SalesCardComponent implements OnInit {

  label: string = "Sales this month";
  total: string = "0";
  percentage: string = "0";
  data = [1,2,3,4];

  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  constructor(private orderManagementService: OrderManagementService,
    private itemManagementService: ItemManagementService,
    private cdr: ChangeDetectorRef) {
      this.chartOptions = {
        chart: {
          type: 'area',
          borderWidth: 0,
          margin: [2, 2, 2, 2],
          height: 60
        },
        plotOptions: {
          area: {
              color: '#03dac5'
          }
        },
        title: {
          text: undefined
        },
        subtitle: {
          text: undefined
        },
        tooltip: {
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false,
        },
        xAxis: {
          labels: {
            enabled: false,
          },
          title: {
            text: null
          },
          categories: this.getMonths(),
        },
        yAxis: {
          labels: {
            enabled: false,
          },
          title: {
            text: null
          },
          startOnTick: false,
          gridLineColor: undefined,
          endOnTick: false,
        },
        series: [
          {
            type: 'area',
            data: this.data,
          }
        ]
      };
    }

  ngOnInit() {
    this.initializeOrderList();
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
    const fourMonthsAgo = new Date(currentDate);
    fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);
    fourMonthsAgo.setDate(1);

    const orderCounts: number[] = [0,0,0,0];

    const filteredOrders = orders.filter((order) => {
      var orderDate = new Date(order.createdAt);
      if (orderDate >= fourMonthsAgo) {
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
          orderCounts[3 - monthDiff] += item.price * filteredOrders[i].quantity;
        }
      });
    }

    this.data = orderCounts;
    this.total = orderCounts[3].toString();
    this.percentage = Math.round(((orderCounts[3] - orderCounts[2])/orderCounts[2]) * 100).toString();
    this.updateData(orderCounts);
  }

  getMonths() : string[] {
    const currentDate = new Date();
    const monthsInWords : string[] = [];

    for (let i = 0; i < 4; i++) {
      const pastDate = new Date(currentDate);
      pastDate.setMonth(currentDate.getMonth() - i);

      const monthInWords = pastDate.toLocaleString('en-US', { month: 'short' });
      monthsInWords.push(monthInWords);
    }

    return monthsInWords.reverse();
  }

  updateData(orderCounts: number[]) {
    if (this.chartOptions.series) {
      this.chartOptions.series = [
        {
          name: 'Sales',
          type: 'area',
          data: orderCounts
        }
      ]
      const updatedOptions = { ...this.chartOptions };
      this.chartOptions = updatedOptions;
      this.cdr.detectChanges();
    }
  }

}
