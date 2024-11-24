import { Component } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss'
})
export class ListCategoryComponent {

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
