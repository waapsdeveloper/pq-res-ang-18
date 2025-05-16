import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-view-expense',
  templateUrl: './view-expense.component.html',
  styleUrl: './view-expense.component.scss'
})
export class ViewExpenseComponent {
  itemId;
  item;

  constructor(
    private nav: NavService,
    private network: NetworkService,
    public activatedRoute: ActivatedRoute
  ) {
    this.initialize();
  }

  async initialize() {
    console.log('yayay');

    const rew = await this.activatedRoute.snapshot.params;

    this.itemId = rew['id'];

    const res = await this.network.getExpenseById(this.itemId);
    console.log(res);

    this.item = res.expense;
    console.log(this.item);
  }
}
