import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { debounceTime } from 'rxjs';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { NetworkService } from 'src/app/services/network.service';
import { OrderExcelExportService } from 'src/app/services/order-excel-export.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-product-report',
  templateUrl: './product-report.component.html',
  styleUrl: './product-report.component.scss'
})
export class ProductReportComponent {
  type: string = 'daily';
  showFilters = false;
  form = new FormGroup({});
  model: any = {};     // filter state
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row g-2 align-items-end filter-bar', // the row wrapper
      fieldGroup: [
        {
          key: 'product_name',
          type: 'input',
          className: 'col-12 col-sm-3',
          templateOptions: {
            label: 'Product Name',
            placeholder: 'e.g. Pepperoni Pizza',
          },
        },
        {
          key: 'category',
          type: 'input',
          className: 'col-12 col-sm-3',
          templateOptions: {
            label: 'Category',
            placeholder: 'e.g. Beverages',
          },
        },
        {
          key: 'report-date',
          type: 'input',
          className: 'col-12 col-sm-3',
          templateOptions: {
            type: 'date',
            label: 'Report Date',
            required: false,
          },
        },
        {
          key: 'orderScope',
          type: 'select',
          className: 'col-12 col-sm-3 formly-select-wrapper-3232',
          templateOptions: {
            label: 'Include Orders',
            options: [
              { label: 'Normal Orders', value: 'normal' },
              { label: 'All Orders (inc. deleted)', value: 'all-orders' },
              { label: 'Deleted Only', value: 'deleted' },
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
    // Ensure the correct API is called for the product report
    if (this.type === 'daily') {
      res = await this.network.getProductReportDaily();
    } else if (this.type === 'monthly') {
      // You might need a getProductReportMonthly method here in the future
      res = await this.network.getProductReportDaily(); // Fallback for now
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
    // Ensure the correct API is called with filters
    if (this.type === 'daily') {
      res = await this.network.getProductReportDaily(filters);
    } else if (this.type === 'monthly') {
      // You might need a getProductReportMonthly method here in the future
      res = await this.network.getProductReportDaily(filters); // Fallback for now
    }

    this.reportData = res;
    console.log('Filtered report:', this.reportData);
  }
  async exportToExcel() {
    if (this.type === 'daily') {
      this.excelService.exportProductReportExcel(this.reportData, 'daily');
    } else if (this.type === 'monthly') {
      this.excelService.exportProductReportExcel(this.reportData, 'monthly');
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
