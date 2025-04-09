import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  navCollapsed: boolean;
  navCollapsedMob = false;


  ListGroup = [
    {
      name: 'Bajaj Finery',
      profit: '10% Profit',
      invest: '$1839.00',
      bgColor: 'bg-light-success',
      icon: 'ti ti-chevron-up',
      color: 'text-success'
    },
    {
      name: 'TTML',
      profit: '10% Loss',
      invest: '$100.00',
      bgColor: 'bg-light-danger',
      icon: 'ti ti-chevron-down',
      color: 'text-danger'
    },
    {
      name: 'Reliance',
      profit: '10% Profit',
      invest: '$200.00',
      bgColor: 'bg-light-success',
      icon: 'ti ti-chevron-up',
      color: 'text-success'
    },
    {
      name: 'ATGL',
      profit: '10% Loss',
      invest: '$189.00',
      bgColor: 'bg-light-danger',
      icon: 'ti ti-chevron-down',
      color: 'text-danger'
    },
    {
      name: 'Stolon',
      profit: '10% Profit',
      invest: '$210.00',
      bgColor: 'bg-light-success',
      icon: 'ti ti-chevron-up',
      color: 'text-success',
      space: 'pb-0'
    }
  ];

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

  public chartSeries1 = [
    { name: 'Widget Line Chart', data: [80, 60, 70, 50, 60, 53, 71, 48, 65, 60] }
  ];
  public chartSeries2 = [
    { name: 'Widget Line Chart', data: [80, 60, 70, 50, 60, 53, 71, 48, 65, 60] }
  ];
  public chartSeries3 = [
    { name: 'Widget Line Chart', data: [45, 55, 51, 65, 50, 62, 58, 70, 48, 57] }
  ];
  public chartSeries4 = [
    { name: 'Widget Line Chart', data: [70, 55, 90, 49, 65, 60, 78, 55, 80, 68] }
  ];

  public chartOptions = {
    chart: {
      type: 'line',
      height: 360,
      toolbar: {
        show: false // Hides the menu to download SVG, PNG, etc.
      }
    } as ApexChart,
    xaxis: {
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
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
      min: 40,
      labels: {
        show: false
      }
    },
    grid: {
      show: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
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

}
