import { Component, Input } from '@angular/core';
import { GlobalDataService } from 'src/app/services/global-data.service';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-list-order-printslip',
  templateUrl: './list-order-printslip.component.html',
  styleUrl: './list-order-printslip.component.scss'
})
export class ListOrderPrintslipComponent {
  @Input() item: any;

  currencySymbol: string = '';
  constructor(private globalData: GlobalDataService) {
    this.globalData.getCurrencySymbol().subscribe((symbol) => {
      this.currencySymbol = symbol;
      console.log('Currency Symbol updated:', this.currencySymbol);
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

  async printSlip(item) {
    this.item = item;
    const section = document.getElementById('print-section');
    const logoUrl = this.item?.restaurant?.logo;

    // Wait for it to load
    await this.preloadImage(logoUrl);
    if (!section) { console.error('Print section not found.'); return; }
    const oldDisplay = section.style.display;
    section.style.display = 'block';
    const opt = {
      margin: 0,
      filename: 'Invoice-' + 'invoice' + '.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2, useCORS: false },
      jsPDF: { unit: 'mm', format: [70, 600], orientation: 'portrait' }
    };
    html2pdf().set(opt).from(section).toPdf().get('pdf').then(function (pdf) {
      window.open(pdf.output('bloburl'), '_blank');
      section.style.display = oldDisplay;
    }).catch(function (err) {
      console.error('PDF generation error:', err);
      section.style.display = oldDisplay;
    });
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

}
