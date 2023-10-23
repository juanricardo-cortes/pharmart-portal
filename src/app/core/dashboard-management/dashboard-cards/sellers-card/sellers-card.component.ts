import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { User } from 'src/app/shared/interfaces/user';
import { UserManagementService } from 'src/app/shared/services/user-management/user-management.service';

@Component({
  selector: 'app-sellers-card',
  templateUrl: './sellers-card.component.html',
  styleUrls: ['./sellers-card.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SellersCardComponent implements OnInit{
  label: string = "Acquired sellers this month";
  total: string = "0";
  percentage: string = "0";
  data = [1,2,3,4];

  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  constructor(private userManagementService: UserManagementService,
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
    this.initializeUserList();
  }

  initializeUserList() {
    this.userManagementService.fetchUsers()

    this.userManagementService.userList$.subscribe(
      (users) => {
        this.getNumberOfUsers(users);
      }
    )
  }

  getNumberOfUsers(users: User[]) {
    const currentDate = new Date();
    const fourMonthsAgo = new Date(currentDate);
    fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);
    fourMonthsAgo.setDate(1);

    const userCounts: number[] = [0,0,0,0];

    const filteredUsers = users.filter((user) => {
      var userDate = new Date(user.createdAt);
      if (userDate >= fourMonthsAgo) {
        return user;
      }
      return null;
    });
    filteredUsers.forEach((user) => {
      var userDate = new Date(user.createdAt);
      const monthDiff = Math.abs(currentDate.getMonth() - userDate.getMonth());
      userCounts[3 - monthDiff]++;;
    });

    this.data = userCounts.reverse();
    this.total = userCounts[3].toString();
    this.percentage = Math.round(((userCounts[3] - userCounts[2])/userCounts[2]) * 100).toString();
    this.updateData(userCounts.reverse());
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

  updateData(sellerCounts: number[]) {
    if (this.chartOptions.series) {
      this.chartOptions.series = [
        {
          name: 'Sellers',
          type: 'area',
          data: sellerCounts
        }
      ]
      const updatedOptions = { ...this.chartOptions };
      this.chartOptions = updatedOptions;
      this.cdr.detectChanges();
    }
  }
}

