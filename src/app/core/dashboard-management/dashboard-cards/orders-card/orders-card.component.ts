import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { OrderTracker } from 'src/app/shared/interfaces/item';
import { OrderTrackerService } from 'src/app/shared/services/order-tracker-management/order-tracker.service';

@Component({
  selector: 'app-orders-card',
  templateUrl: './orders-card.component.html',
  styleUrls: ['./orders-card.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class OrdersCardComponent implements OnInit {
  label: string = "Orders this month";
  total: string = "0";
  percentage: string = "0";
  data = [1,2,3,4];

  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  constructor(private orderTrackerService: OrderTrackerService,
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
    this.initializeTrackList();
  }

  initializeTrackList() {
    this.orderTrackerService.orderTrackerList$.subscribe(
      (tracks) => {
        this.getNumberOfTracks(tracks);
      }
    )
  }

  getNumberOfTracks(tracks: OrderTracker[]) {
    const currentDate = new Date();
    const fourMonthsAgo = new Date(currentDate);
    fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);
    fourMonthsAgo.setDate(1);

    const trackCounts: number[] = [0,0,0,0];

    const filteredTracks = tracks.filter((track) => {
      var trackDate = new Date(track.createdAt);
      if (trackDate >= fourMonthsAgo) {
        return track;
      }
      return null;
    });

    filteredTracks.forEach((track) => {
      var trackDate = new Date(track.createdAt);
      const monthDiff = Math.abs(currentDate.getMonth() - trackDate.getMonth());
      trackCounts[3 - monthDiff]++;;
    });

    this.data = trackCounts;
    this.total = trackCounts[3].toString();
    this.percentage = Math.round(((trackCounts[3] - trackCounts[2])/trackCounts[2]) * 100).toString();
    this.updateData(trackCounts);
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

  updateData(trackCounts: number[]) {
    if (this.chartOptions.series) {
      this.chartOptions.series = [
        {
          name: 'Orders',
          type: 'area',
          data: trackCounts
        }
      ]
      const updatedOptions = { ...this.chartOptions };
      this.chartOptions = updatedOptions;
      this.cdr.detectChanges();
    }
  }
}
