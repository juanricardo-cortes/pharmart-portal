import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { OrderTracker } from 'src/app/shared/interfaces/item';
import { OrderTrackerService } from 'src/app/shared/services/order-tracker-management/order-tracker.service';

@Component({
  selector: 'app-orders-graph',
  templateUrl: './orders-graph.component.html',
  styleUrls: ['./orders-graph.component.css']
})
export class OrdersGraphComponent implements OnInit{

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  data = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233];

  constructor(private orderTrackerService: OrderTrackerService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.initializeTrackList();
  }

  initializeChartOptions() {
    this.chartOptions = {
      chart: {
        width: 600,
      },
      title: {
        text: 'Orders per Month'
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
          name: "Orders",
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

  initializeTrackList() {
    this.orderTrackerService.orderTrackerList$.subscribe(
      (tracks) => {
        this.getNumberOfTracks(tracks);
      }
    )
  }

  getNumberOfTracks(tracks: OrderTracker[]) {
    console.log(tracks)
    const currentDate = new Date();
    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setMonth(oneYearAgo.getMonth() - 12);
    oneYearAgo.setDate(1);

    const trackCounts: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];

    const filteredTracks = tracks.filter((track) => {
      var trackDate = new Date(track.createdAt);
      if (trackDate >= oneYearAgo) {
        return track;
      }
      return null;
    });
    filteredTracks.forEach((track) => {
      var trackDate = new Date(track.createdAt);
      const monthDiff = Math.abs(currentDate.getMonth() - trackDate.getMonth());
      trackCounts[11 - monthDiff]++;;
    });

    this.data = trackCounts;
    this.initializeChartOptions();
  }
}
