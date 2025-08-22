import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { NetworkService } from 'src/app/services/network.service';
import { OrderExcelExportService } from 'src/app/services/order-excel-export.service';
import { UtilityService } from 'src/app/services/utility.service';
@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrl: './order-report.component.scss'
})
export class OrderReportComponent implements OnInit {
  type: string = 'daily';
  reportData: any;
  data: any;
  currencySymbol: string = '$';
  constructor(
    private route: ActivatedRoute,
    private network: NetworkService,
    private globalDataService: GlobalDataService,
    private excelService: OrderExcelExportService,
    private utilityService:UtilityService
  ) {

    this.globalDataService.getCurrencySymbol().subscribe((symbol) => {
      this.currencySymbol = symbol;
      console.log('Currency Symbol updated:', this.currencySymbol);
    });

  }
  async ngOnInit() {
    this.type = this.route.snapshot.data['type'] || 'daily';
    console.log(this.type)
    let res;
    if (this.type === 'daily') {
      res = await this.network.getOrderReportDaily();
    } else if (this.type === 'monthly') {
      res = await this.network.getOrderReportMonthly();
    }
    setTimeout(() => {
      console.log(res);
      this.reportData = res;
      console.log("report", this.reportData);
    }, 3000);
  }
  async exportToExcel() {
    if (this.type === 'daily') {
      this.excelService.exportOrdersExcel(this.reportData, "daily");
    }
    else if (this.type === 'monthly') {
      this.excelService.exportOrdersExcel(this.reportData, "monthly");
    }
    await this.utilityService.presentSuccessToast("Sheet is downloaded , Check your downloads")
  }
}
