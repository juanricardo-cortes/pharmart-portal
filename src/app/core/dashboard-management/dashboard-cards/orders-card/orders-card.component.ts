import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { OrderTracker } from 'src/app/shared/interfaces/item';
import { OrderTrackerService } from 'src/app/shared/services/order-tracker-management/order-tracker.service';

@Component({
  selector: 'app-orders-card',
  templateUrl: './orders-card.component.html',
  styleUrls: ['./orders-card.component.css']
})
export class OrdersCardComponent implements OnInit {
  label: string = "Orders this month";
  total: string = "0";
  percentage: string = "0";
  data = [1,2,3,4];

  Highcharts = Highcharts;
  chartOptions = {};

  constructor(private orderTrackerService: OrderTrackerService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.initializeTrackList();
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
            color: '#03dac5'
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
        name: "Orders",
        data: this.data
      }]
    };

    HC_exporting(Highcharts);
    this.cdr.detectChanges();
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
    const fourMonthsAgo = new Date(currentDate);
    fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);

    const trackCounts: number[] = [0,0,0,0];

    const filteredTracks = tracks.filter((track) => {
      var trackDate = new Date(track.createdAt);
      if (trackDate.getMonth() >= fourMonthsAgo.getMonth()) {
        return track;
      }
      return null;
    });
    filteredTracks.forEach((track) => {
      var trackDate = new Date(track.createdAt);
      const monthDiff = Math.abs(currentDate.getMonth() - trackDate.getMonth());
      trackCounts[3 - monthDiff]++;;
    });

    this.total = trackCounts[3].toString();
    this.percentage = Math.round(((trackCounts[3] - trackCounts[2])/trackCounts[2]) * 100).toString();
    this.initializeChartOptions();
  }
}
