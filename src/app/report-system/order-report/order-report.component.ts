import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { NetworkService } from 'src/app/services/network.service';
import { OrderExcelExportService } from 'src/app/services/order-excel-export.service';
import { UtilityService } from 'src/app/services/utility.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.scss']
})
export class OrderReportComponent implements OnInit {
  type: string = 'daily';
  showFilters = false;
  form = new FormGroup({});
  model: any = {};     // filter state
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row g-2 align-items-end filter-bar', // the row wrapper
      fieldGroup: [
        {
          key: 'orderid',
          type: 'input',
          className: 'col-12 col-sm-2 formly-select-wrapper-3232', // 3 per row on >= sm
          templateOptions: {
            label: 'Order ID',
            placeholder: 'e.g. ORD-2025...',
          },
        },
        {
          key: 'type',
          type: 'select',
          className: 'col-12 col-sm-2 formly-select-wrapper-3232',
          templateOptions: {
            label: 'Order Type',
            options: [
              { label: 'Drive-Thru', value: 'drive-thru' },
              { label: 'Dine-In', value: 'dine-in' },
              { label: 'Take-Away', value: 'take-away' },
              { label: 'Delivery', value: 'delivery' },
              { label: 'Curbside Pickup', value: 'curbside-pickup' },
              { label: 'Catering', value: 'catering' },
              { label: 'Reservation', value: 'reservation' },
            ],
          },
        },
        {
          key: 'report-date',
          type: 'input',
          className: 'col-12 col-sm-2 formly-select-wrapper-3232',
          templateOptions: {
            type: 'date',
            label: 'Date of Birth',
            required: false,
          },
        },
        {
          key: 'orderScope',
          type: 'select',
          className: 'col-12 col-sm-2 formly-select-wrapper-3232',
          templateOptions: {
            label: 'orderScope',
            options: [
              { label: ' All Orders', value: 'all-orders' },
              { label: 'Deleted Orders', value: 'deleted' },
              { label: 'Order', value: 'order' },],
          },
        },


        {
          key: 'status',
          type: 'select',
          className: 'col-12 col-sm-2 formly-select-wrapper-3232',
          templateOptions: {
            label: 'Status',
            options: [
              { label: 'Pending', value: 'pending' },
              { label: 'Confirmed', value: 'confirmed' },
              { label: 'Preparing', value: 'preparing' },
              { label: 'Ready for Pickup', value: 'ready_for_pickup' },
              { label: 'Out for Delivery', value: 'out_for_delivery' },
              { label: 'Delivered', value: 'delivered' },
              { label: 'Completed', value: 'completed' },
              { label: 'Cancelled', value: 'cancelled' },
            ],
          },
        },
      ],
    },
  ];




  reportData: any;
  currencySymbol: string = '$';

  constructor(
    private route: ActivatedRoute,
    private network: NetworkService,
    private globalDataService: GlobalDataService,
    private excelService: OrderExcelExportService,
    private utilityService: UtilityService
  ) {
    this.globalDataService.getCurrencySymbol().subscribe((symbol) => {
      this.currencySymbol = symbol;
      console.log('Currency Symbol updated:', this.currencySymbol);
    });
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  ngOnInit() {
    this.type = this.route.snapshot.data['type'] || 'daily';
    console.log('Report type:', this.type);

    // Load initial data
    this.loadReport();
    this.form.valueChanges
      .pipe(debounceTime(700))
      .subscribe(val => this.callApi(val));
  }

  private async loadReport() {
    let res;
    if (this.type === 'daily') {
      res = await this.network.getOrderReportDaily();
    } else if (this.type === 'monthly') {
      res = await this.network.getOrderReportMonthly();
    }
    this.reportData = res;
    console.log('Report data loaded:', this.reportData);
  }

  private applyFilters(filters: any) {
    console.log('Applying filters:', filters);
    // Replace with your API call to fetch filtered data
    // this.network.getOrders(filters).subscribe((data) => {
    //   this.reportData = data;
    //   console.log('Filtered report:', this.reportData);
    // });
  }
  async callApi(filters: any) {
    console.log('Filters changed:', filters);

    let res;
    if (this.type === 'daily') {
      res = await this.network.getOrderReportDaily(filters);
    } else if (this.type === 'monthly') {
      res = await this.network.getOrderReportMonthly(filters);
    }

    this.reportData = res;
    console.log('Filtered report:', this.reportData);
  }
  async exportToExcel() {
    if (this.type === 'daily') {
      this.excelService.exportOrdersExcel(this.reportData, 'daily');
    } else if (this.type === 'monthly') {
      this.excelService.exportOrdersExcel(this.reportData, 'monthly');
    }
    await this.utilityService.presentSuccessToast('Sheet is downloaded, check your downloads');
  }
  resetFilters() {
    console.log("Resetting filters...");

    // Clear form values & model
    this.form.reset();
    this.model = {};

    // Reload report without filters
    this.loadReport();
  }

}
