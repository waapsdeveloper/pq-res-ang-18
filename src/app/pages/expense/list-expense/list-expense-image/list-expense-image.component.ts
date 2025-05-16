import { ChangeDetectorRef, Component, Injector, Input } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { EventsService } from 'src/app/services/events.service';
import { NetworkService } from 'src/app/services/network.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-list-expense-image',
  templateUrl: './list-expense-image.component.html',
  styleUrl: './list-expense-image.component.scss'
})
export class ListExpenseImageComponent {
  @Input() item: any;
  constructor(
    injector: Injector,
    private nav: NavService,
    private utility: UtilityService,
    private users: UsersService,
    private network: NetworkService,
    private cdr: ChangeDetectorRef,
    public events: EventsService
  ) {}
  openImageModal() {
    this.utility.showImagePopup('Expense', this.item.image);
  }
}
