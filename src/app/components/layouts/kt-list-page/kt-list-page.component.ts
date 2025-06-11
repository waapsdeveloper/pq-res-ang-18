import { Title } from '@angular/platform-browser';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service'; // adjust path as needed
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kt-list-page',
  templateUrl: './kt-list-page.component.html',
  styleUrl: './kt-list-page.component.scss',
  encapsulation: ViewEncapsulation.None // Ensure styles are not scoped
})
export class KtListPageComponent {
  @Input('showCreate') showCreate = true;
  @Input('title') title = '';
  @Input('addurl') addurl = '';
  @Input('titleHighlightPart') titleHighlightPart: string = '';

  @Input('showDeleteAll') showDeleteAll = false;
  @Output('onSearch') onSearch = new EventEmitter<any>();
  @Output('onFilter') onFilter = new EventEmitter<any>();
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
