import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { OrderTracker } from 'src/app/shared/interfaces/item';
import { OrderTrackerService } from 'src/app/shared/services/order-tracker-management/order-tracker.service';
import exporting from 'highcharts/modules/exporting';
exporting(Highcharts);

@Component({
  selector: 'app-orders-graph',
  templateUrl: './orders-graph.component.html',
  styleUrls: ['./orders-graph.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class OrdersGraphComponent implements OnInit{

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  data = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233];

  constructor(private orderTrackerService: OrderTrackerService,
    private cdr: ChangeDetectorRef) {
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
        exporting: {
          enabled: true,
          buttons: {
            contextButton: {
                menuItems: ['downloadPDF', 'downloadPNG', 'downloadJPEG', 'downloadSVG']
            }
        }
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

    }

  ngOnInit() {
    this.initializeTrackList();
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
    this.updateData(trackCounts);
  }

  updateData(trackCounts: number[]) {
    if (this.chartOptions.series) {
      this.chartOptions.series = [
        {
          name: 'Orders',
          type: 'line',
          data: trackCounts
        }
      ]
      const updatedOptions = { ...this.chartOptions };
      this.chartOptions = updatedOptions;
      this.cdr.detectChanges();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const newWidth = event.target.innerWidth - 50;
    if (newWidth <= 1200) {
      if (this.chartOptions.chart) {
        this.chartOptions.chart ={
          width: newWidth,
        }
        const updatedOptions = { ...this.chartOptions };
        this.chartOptions = updatedOptions;
        this.cdr.detectChanges();
      }
    }
    else {
      if (this.chartOptions.chart) {
        this.chartOptions.chart ={
          width: 600,
        }
        const updatedOptions = { ...this.chartOptions };
        this.chartOptions = updatedOptions;
        this.cdr.detectChanges();
      }
    }
  }
}
