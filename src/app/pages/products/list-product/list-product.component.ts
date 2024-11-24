import { Component } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})
export class ListProductComponent {

  search = '';
  page = 1;
  lastPage = -1;
  total = 0;
  list: any[] = [];

  columns: any[] = [
    'Name',
    'Meta Data'
  ]

  constructor(private nav: NavService){

  }
}
