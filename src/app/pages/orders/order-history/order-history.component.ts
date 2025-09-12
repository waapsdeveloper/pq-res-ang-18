import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit, OnChanges {
  id: string | null = null;
  @Input() item: any;
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  processedEvents: any[] = [];
  displayedEvents: any[] = [];

  constructor(private route: ActivatedRoute, private networkService: NetworkService) {}

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id');
    this.processTimelineEvents();
    console.log(this.item, 'history item!');
  }

  // Unified ngOnChanges - handles both incoming `item` and any manual changes to processedEvents
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && this.item) {
      this.processTimelineEvents();
    }

    if (changes['processedEvents']) {
      this.prepareEvents();
    }
  }

  private processTimelineEvents(): void {
    if (!this.item || !this.item.events) {
      this.processedEvents = [];
      this.prepareEvents();
      return;
    }

    const events = [...(this.item.events || [])];

    if (this.item.deleted_at) {
      events.push({
        event_type: 'order_deleted',
        timestamp: this.item.deleted_at,
        performed_by: 'System',
      });
    }

    // Sort ascending by timestamp
    events.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    this.processedEvents = events;
    this.prepareEvents();
  }

  // Emits the close event to the parent component
  close(): void {
    this.onClose.emit();
  }

  private tryParse(val: any) {
    if (val === null || val === undefined) return null;
    if (typeof val !== 'string') return val;
    try {
      let parsed = JSON.parse(val);
      if (typeof parsed === 'string') {
        parsed = JSON.parse(parsed);
      }
      return parsed;
    } catch (e) {
      return val;
    }
  }

  private normalizeProductPayload(payload: any) {
    if (!payload) return null;
    let p = (typeof payload === 'string') ? this.tryParse(payload) : payload;
    if (!p) return null;
    if (p.variation && typeof p.variation === 'string') {
      p.variation = this.tryParse(p.variation);
    }
    return p;
  }

  prepareEvents() {
    const list = (this.processedEvents || []).map(ev => {
      const oldParsed = this.tryParse(ev.old_value);
      const newParsed = this.tryParse(ev.new_value);

      const isProductEvent = ev.event_type && ev.event_type.startsWith('product');

      return {
        ...ev,
        oldValueParsed: isProductEvent ? this.normalizeProductPayload(oldParsed) : oldParsed,
        newValueParsed: isProductEvent ? this.normalizeProductPayload(newParsed) : newParsed,
        _open: false
      };
    });

    // Put product_added events first, then sort by timestamp desc
    list.sort((a, b) => {
      if (a.event_type === 'product_added' && b.event_type !== 'product_added') return -1;
      if (b.event_type === 'product_added' && a.event_type !== 'product_added') return 1;
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    this.displayedEvents = list;
  }

  toggleDetails(ev: any) {
    ev._open = !ev._open;
  }
}
