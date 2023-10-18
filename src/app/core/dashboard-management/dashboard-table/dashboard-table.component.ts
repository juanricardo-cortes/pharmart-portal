import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.css']
})
export class DashboardTableComponent {
  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;

  data = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233];

  chartOptions: Highcharts.Options = {
    chart: {
        width: 800,
    },
    title: {
      text: 'Sales per Month' // Set the chart title here
    },
    yAxis: {
        title: {
            text: ''
        }
    },
    xAxis: {
      title: {
        text: 'Month'
      },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
}
