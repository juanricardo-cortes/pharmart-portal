import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { OrderItem } from 'src/app/shared/interfaces/item';
import { ItemManagementService } from 'src/app/shared/services/item-management/item-management.service';
import { OrderManagementService } from 'src/app/shared/services/order-management/order-management.service';

@Component({
  selector: 'app-sales-card',
  templateUrl: './sales-card.component.html',
  styleUrls: ['./sales-card.component.css']
})
export class SalesCardComponent implements OnInit {
  label: string = "Sales this month";
  total: string = "0";
  percentage: string = "0";
  data = [1,2,3,4];

  Highcharts = Highcharts;
  chartOptions = {};

  constructor(private orderManagementService: OrderManagementService,
    private itemManagementService: ItemManagementService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.initializeOrderList();
  }

  initializeChartOptions() {
    this.chartOptions = {
      chart: {
        type: 'area',
        backgroundColor: null,
        borderWidth: 0,
        margin: [2, 2, 2, 2],
        height: 60
      },
      plotOptions: {
        area: {
          threshold: null,
            color: '#03dac5'
        },
        series: {
          connectNulls: false // Disable connecting null values
        }
      },
      title: {
        text: null
      },
      subtitle: {
        text: null
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
        startOnTick: false,
        endOnTick: false,
        tickOptions: []
      },
      yAxis: {
        labels: {
          enabled: false,
        },
        title: {
          text: null
        },
        startOnTick: false,
        endOnTick: false,
        gridLineColor: null,
        tickOptions: []
      },
      series: [{
        name: "Sales",
        data: this.data
      }]
    };

    HC_exporting(Highcharts);
    this.cdr.detectChanges();
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
    this.initializeChartOptions();
  }
}
