import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { GlobalDataService } from 'src/app/services/global-data.service';
import html2pdf from 'html2pdf.js';

import { InvoiceService } from 'src/app/services/invoice.service';
import { left } from '@popperjs/core';
import { PrintingService } from 'src/app/services/printer.service';
import { DecimalPipe } from '@angular/common';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-list-order-printslip',
  templateUrl: './list-order-printslip.component.html',
  styleUrl: './list-order-printslip.component.scss',
  providers: [DecimalPipe]
})
export class ListOrderPrintslipComponent implements OnInit {
  @Input() item: any;
  size;
  digits;
  marginleft = 0;
  marginright = 0;
  fontSize;
  address;
  footertext = '';
  logoBase64 = '';
  barcode = '';
  currencySymbol: string = '';
  @ViewChild('printSection', { static: false }) printSection!: ElementRef;
  constructor(private globalData: GlobalDataService, public invoiceService: InvoiceService, private printingService: PrintingService, private decimalPipe: DecimalPipe, private utilityService: UtilityService) {
    this.globalData.getCurrencySymbol().subscribe((symbol) => {
      this.currencySymbol = symbol;
      console.log('Currency Symbol updated:', this.currencySymbol);
    });
    this.globalData.getDigits().subscribe((digits) => {
      this.digits = digits;
      console.log('Digits updated:', this.digits);
    });

  }

  async ngOnInit() {
    this.invoiceService.getInvoiceBase64().subscribe(base64 => {
      this.logoBase64 = base64;
    });
    this.invoiceService.getGoogleReviewBarcodeBase64().subscribe(base64 => {
      this.barcode = base64;
    });
    this.invoiceService.getRestaurantAddress().subscribe(address => {
      this.address = address;
    });
    this.invoiceService.getFooterText().subscribe(text => {
      this.footertext = text;
    });

    this.invoiceService.getLeftMargin().subscribe(left => {
      this.marginleft = left;
    });

    this.invoiceService.getRightMargin().subscribe(right => {
      this.marginright = right;
    });
    this.size = this.invoiceService.getSize().subscribe(size => {
      this.size = size || 80; // Default to 10 if not set
    });
    this.fontSize = this.invoiceService.getFontSize().subscribe(size => {
      this.fontSize = size || 10; // Default to 10 if not set
    });

  }

  private preloadImage(url: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!url) {
        resolve(); // no image, skip
        return;
      }
      const img = new Image();
      img.crossOrigin = 'anonymous'; // important for html2canvas
      img.onload = () => resolve();
      img.onerror = () => {
        console.warn(`Image failed to load: ${url}`);
        resolve(); // don't block printing if image fails
      };
      img.src = url;
    });
  }

  async printSlip(item: any) {
    this.item = item;

    const section = document.getElementById('print-section');
    if (!section) {
      console.error('Print section not found.');
      return;
    }

    const oldDisplay = section.style.display;
    section.style.display = 'block';

    try {
      const opt = {
        margin: 0,
        filename: 'Invoice.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, useCORS: true, allowTaint: true },
        jsPDF: { unit: 'mm', format: [this.size, 800], orientation: 'portrait' }
      };

      // Generate PDF blob
      const pdfBlob: Blob = await html2pdf()
        .set(opt)
        .from(section)
        .toPdf()
        .outputPdf('blob');

      // Send blob → local daemon
      const formData = new FormData();
      formData.append('file', pdfBlob, 'invoice.pdf');

      const res = await fetch('http://localhost:9000/print', {
        method: 'POST',
        body: formData,
      });

      if (res) {
        this.utilityService.presentSuccessToast('Printed successfully');
        console.log('✅ Printed successfully');

      } 
    } catch (err) {
      this.utilityService.presentFailureToast(err);
      console.error('PDF generation/print error:', err);
    } finally {
      section.style.display = oldDisplay;
    }
  }
  manualPrint(item) {
    this.item = item;
    if (!this.printSection) return;

    const section = this.printSection.nativeElement;
    const opt = { margin: 0, filename: 'Invoice-' + '.pdf', image: { type: 'jpeg', quality: 1 }, html2canvas: { scale: 2, useCORS: true, allowTaint: true }, jsPDF: { unit: 'mm', format: [this.size, 800], orientation: 'portrait' } }; html2pdf().set(opt).from(section).toPdf().get('pdf').then(function (pdf) { window.open(pdf.output('bloburl'), '_blank'); });
    this.utilityService.presentSuccessToast('PDF Generated');
  }

  getProdUnitPrice(prod: any): number {
    let base = parseFloat(prod?.price ?? 0);

    // Add variation prices (radio + checkbox)
    if (prod.variation && Array.isArray(prod.variation)) {
      prod.variation.forEach((v: any) => {
        if (v.selectedOption?.price) {
          base += parseFloat(v.selectedOption.price);
        }
        if (v.options && Array.isArray(v.options)) {
          v.options.forEach((o: any) => {
            if (o.selected && o.price) {
              base += parseFloat(o.price);
            }
          });
        }
      });
    }

    return base;
  }

  getProdTotalPrice(prod: any): number {
    const unit = this.getProdUnitPrice(prod);
    return unit * (prod?.quantity ?? 0);
  }
  formatSpecial(value: number, digits: number): string {
    const format = `1.${digits}-${digits}`;
    return this.decimalPipe.transform(value, format, 'en-US') ?? '';
  }
}
