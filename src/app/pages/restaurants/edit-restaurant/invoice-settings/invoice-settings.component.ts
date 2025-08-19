import { Component, Input, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoice.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-invoice-settings',
  templateUrl: './invoice-settings.component.html',
  styleUrl: './invoice-settings.component.scss'
})
export class InvoiceSettingsComponent  {
  @Input() form: any;
  @Input() invoiceFields: any;
  @Input() model: any;
  
  @Input() restaurantId: any;

  constructor(private network: NetworkService,
    private utility: UtilityService,
    private invoice: InvoiceService) {
  }
  async submitConfig() {
    console.log('Submitting invoice settings:', this.model);
    const payload = {
      google_review_barcode: this.model.google_review_bar_code_base64,
      restaurant_id: this.restaurantId,
      footer_text: this.model.footer_text,
      invoice_logo: this.model.invoice_base64,
      size: `${this.model.size}mm`,
      left_margin: `${this.model.left_margin}`,
      right_margin: `${this.model.right_margin}`,
      google_review_bar_code_base64: this.model.google_review_bar_code_base64,
      restaurant_address: this.model.restaurant_address,
      font_size: this.model.font_size.toString(),
    };
    const res =  await this.network.updateInvoiceSetting(this.restaurantId, payload);
    this.utility.showAlert('Invoice settings updated successfully', 'success');
    await this.invoice.fetchInvoiceData(this.restaurantId)
    
    console.log('Invoice settings updated:', res);
  }
}
