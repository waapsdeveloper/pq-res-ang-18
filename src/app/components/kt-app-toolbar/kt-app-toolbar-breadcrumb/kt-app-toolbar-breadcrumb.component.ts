import { Component } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

export interface Breadcrumb {
  label: string;
  url: string;
}


@Component({
  selector: 'app-kt-app-toolbar-breadcrumb',
  templateUrl: './kt-app-toolbar-breadcrumb.component.html',
  styleUrl: './kt-app-toolbar-breadcrumb.component.scss'
})
export class KtAppToolbarBreadcrumbComponent {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {}

  async ngOnInit() {
    const res = await this.breadcrumbService.getBreadcrumbs()
    // console.log("firei", res)
    this.breadcrumbs = res;

    // this.breadcrumbService.breadcrumbs$.subscribe((breadcrumbs) => {
    //   this.breadcrumbs = breadcrumbs;
    // });
  }
}
