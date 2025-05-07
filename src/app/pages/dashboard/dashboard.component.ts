import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  navCollapsed: boolean;
  navCollapsedMob = false;
  totalOrders = 0;
  totalRevenue = 0;

  profileCard = [
    {
      style: 'bg-primary-dark text-white',
      background: 'bg-primary',
      value: '$203k',
      text: 'Net Profit',
      color: 'text-white',
      value_color: 'text-white'
    },
    {
      background: 'bg-warning',
      avatar_background: 'bg-light-warning',
      value: '$550K',
      text: 'Total Revenue',
      color: 'text-warning'
    }
  ];

  constructor(private network: NetworkService) {}

  async ngOnInit() {
    const res = await this.network.getTopDashboardCard();
    if (res) {
      this.totalOrders = res.total_orders;
      this.totalRevenue = res.total_amount;
      this.updateChart(res.graphs);
    }
  }

  navMobClick() {
    if (this.navCollapsedMob && !document.querySelector('app-navigation.coded-navbar')?.classList.contains('mob-open')) {
      this.navCollapsedMob = !this.navCollapsedMob;
      setTimeout(() => {
        this.navCollapsedMob = !this.navCollapsedMob;
      }, 100);
    } else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
    if (document.querySelector('app-navigation.pc-sidebar')?.classList.contains('navbar-collapsed')) {
      document.querySelector('app-navigation.pc-sidebar')?.classList.remove('navbar-collapsed');
    }
  }
  public chartSeries1 = [{ name: 'Total Amount', data: [] }];
  public chartSeries2 = [{ name: 'Total Orders', data: [] }];
  public chartOptions = {
    chart: {
      type: 'line',
      height: 75,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 3,
        opacity: 0.2
      }
    } as ApexChart,
    stroke: {
      curve: 'straight',
      width: 2,
      colors: ['#fff']
    },
    xaxis: {
      categories: [],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false
      }
    },
    yaxis: {
      min: 0,
      labels: {
        show: false
      }
    },
    grid: {
      show: false
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      y: {
        formatter: (val: number) => {
          return '$' + val;
        }
      }
    },
    title: {
      text: 'Dashboard Widget Line Chart',
      align: 'left'
    }
  };
  updateChart(graphs: any) {
    if (graphs && graphs.categories && graphs.series) {
      const totalAmountSeries = graphs.series.find((s) => s.name === 'Total Amount');
      const totalOrdersSeries = graphs.series.find((s) => s.name === 'Total Orders');

      this.chartOptions = {
        ...this.chartOptions,
        xaxis: {
          categories: graphs.categories,
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            show: false
          }
        }
      };

      this.chartSeries1 = totalAmountSeries
        ? [
            {
              name: 'Total Amount',
              data: totalAmountSeries.data.map((value) => parseFloat(value))
            }
          ]
        : [{ name: 'Total Amount', data: [] }];

      this.chartSeries2 = totalOrdersSeries
        ? [
            {
              name: 'Total Orders',
              data: totalOrdersSeries.data.map((value) => parseFloat(value))
            }
          ]
        : [{ name: 'Total Orders', data: [] }];
    }
  }
}
