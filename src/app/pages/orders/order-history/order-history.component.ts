import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnChanges {
  id;
  @Input() item: any;
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  processedEvents: any[] = [];

  constructor(private route: ActivatedRoute, private networkService: NetworkService) {

  }
  async ngOnInit() {
    // Access the parameter
    this.id = this.route.snapshot.paramMap.get('id');
    // this.item = await this.networkService.getOrderHistory(this.id);
    this.processTimelineEvents();
    console.log(this.item, "history item!");
  }

  // This lifecycle hook will re-process the data whenever a new 'item' is passed in.
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && this.item) {
      this.processTimelineEvents();
    }
  }

  private processTimelineEvents(): void {
    if (!this.item || !this.item.events) {
      this.processedEvents = [];
      return;
    }

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

  // Emits the close event to the parent component
  close(): void {
    this.onClose.emit();
  }
}
