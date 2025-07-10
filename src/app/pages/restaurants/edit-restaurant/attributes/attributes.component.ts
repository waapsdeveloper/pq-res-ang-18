import { Component, Input } from '@angular/core';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrl: './attributes.component.scss'
})
export class AttributesComponent {
  @Input() form: any;
  @Input() attributesField: any;
  @Input() model: any;
  @Input() restaurantId: any;
  constructor(
    private network: NetworkService,
    private utility: UtilityService,
    private globalData: GlobalDataService
  ) {}
}
