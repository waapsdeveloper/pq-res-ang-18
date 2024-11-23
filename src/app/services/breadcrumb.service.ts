import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';


export interface Breadcrumb {
  label: string;
  url: string;
  active?: boolean; // To highlight the current breadcrumb
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs$ = this.breadcrumbs.asObservable();

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const root = this.router.routerState.snapshot.root;
        const breadcrumbs = this.createBreadcrumbs(root);
        this.breadcrumbs.next(breadcrumbs);
      });
  }

  public getBreadcrumbs(){
    const root = this.router.routerState.snapshot.root;
    return this.createBreadcrumbs(root);

  }

  private createBreadcrumbs(route: ActivatedRouteSnapshot, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {

    console.log(route)

    if (route) {
      const routeUrl = route.url.map((segment) => segment.path).join('/');
      const nextUrl = routeUrl ? `${url}/${routeUrl}` : url;

      if (route.data['breadcrumb']) {
        breadcrumbs.push({
          label: route.data['breadcrumb'],
          url: nextUrl,
          active: !route.firstChild, // Mark the last breadcrumb as active
        });
      }

      if (route.firstChild) {
        return this.createBreadcrumbs(route.firstChild, nextUrl, breadcrumbs);
      }
    }
    return breadcrumbs;
  }



}
