import { Component, Input } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-invoice-settings',
  templateUrl: './invoice-settings.component.html',
  styleUrl: './invoice-settings.component.scss'
})
export class InvoiceSettingsComponent {
  @Input() form: any;
  @Input() invoiceFields: any;
  @Input() model: any;
  @Input() restaurantId: any;

  constructor(private network: NetworkService,
    private utility: UtilityService,) { }
    submitConfig(){
      console.log('submitConfig called');
    }
}
