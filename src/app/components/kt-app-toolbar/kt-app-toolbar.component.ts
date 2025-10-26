import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, UrlTree } from '@angular/router';
import { PermissionService } from 'src/app/services/permission.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-kt-app-toolbar',
  templateUrl: './kt-app-toolbar.component.html',
  styleUrl: './kt-app-toolbar.component.scss',
  animations: [
    trigger('filterAnimation', [
      state('void', style({
        transform: 'translateY(-20px)',
        opacity: 0,
        height: '0',
      })),
      state('*', style({
        transform: 'translateY(0)',
        opacity: 1,
        height: '*',
      })),
      transition('void <=> *', animate('300ms ease-in-out'))
    ])
  ]
})
export class KtAppToolbarComponent {
  @Input('showCreate') showCreate = true;
  @Input('title') title = '';
  @Input('addurl') addurl = '';
  @Input('titleHighlightPart') titleHighlightPart: string = '';
  @Input('showFilters') showFilters = false;
  
  @Input('showDeleteAll') showDeleteAll = false;
  @Output('onSearch') onSearch = new EventEmitter<any>();
  @Output('onFilter') onFilter = new EventEmitter<any>();
  @Output('resetFilter') resetFilter = new EventEmitter<void>();
  @Output('onDeleteAll') onDeleteAll = new EventEmitter<any>();

  @Input('entity') entity: string = '';
  @Input('action') action: string = '';
  @Input('canCreate') canCreate = false;
  @Input('canFilter') canFilter = false;
  @Input('canDelete') canDelete = false;

  constructor(
    public permissionService: PermissionService,
    private route: ActivatedRoute
  ) {
    this.entity = this.route.snapshot.data['entity'] || ''; // <-- Get entity from route data
    this.canCreate = this.permissionService.hasPermission(this.entity + '.add');
    this.canFilter = this.permissionService.hasPermission(this.entity + '.filter');
    this.canDelete = this.permissionService.hasPermission(this.entity + '.delete');
  }

  search($event) {
    let v = $event.target.value;
    this.onSearch.emit(v);
  }

  filter($event) {
    this.onFilter.emit();
  }
}
