import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { GlobalDataService } from './services/global-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private http: HttpClient,
    private globalData: GlobalDataService,
  ) { }

async ngOnInit() {
    try {
      const restaurant = await this.globalData.getDefaultRestaurant()  as any;

      if (restaurant) {
        this.titleService.setTitle(restaurant.name);

        this.setFavicon(restaurant.favicon || '/assets/favicon.ico');
      }
    } catch (error) {
      console.error('Error fetching active restaurant:', error);
    }
  }

  private setFavicon(faviconUrl: string) {
    let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = faviconUrl;
  } 
}
  
