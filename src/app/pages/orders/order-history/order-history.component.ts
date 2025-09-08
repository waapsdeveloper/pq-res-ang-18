import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent {
  id;
  item;
  processedEvents: any[] = [];

  constructor(private route: ActivatedRoute, private networkService: NetworkService) {

  }
  async ngOnInit() {
    // Access the parameter
    this.id = this.route.snapshot.paramMap.get('id');
    this.item = await this.networkService.getOrderHistory(this.id);
    this.processTimelineEvents();
    console.log(this.item, "history item!");



  }
  private processTimelineEvents(): void {
    let events = [...(this.item.events || [])];

    // Add the deleted event if it exists
    if (this.item.deleted_at) {
      events.push({
        event_type: 'order_deleted',
        timestamp: this.item.deleted_at,
        performed_by: 'System', // Assuming we don't know who deleted it from the main object
      });
    }

    // Sort all events chronologically
    events.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    this.processedEvents = events;
  }
}
