import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-view-branch-config',
  templateUrl: './view-branch-config.component.html',
  styleUrl: './view-branch-config.component.scss'
})
export class ViewBranchConfigComponent {
  itemId: any;
  item: any;

  constructor(
    private network: NetworkService,
    private activatedRoute: ActivatedRoute
  ) {
    this.initialize();
  }

  async initialize() {
    const params = this.activatedRoute.snapshot.params;
    this.itemId = params['id'];
    const res = await this.network.getBranchConfigById(this.itemId);
    // Adjust according to your API response structure
    this.item = res?.data || {};
  }
}
