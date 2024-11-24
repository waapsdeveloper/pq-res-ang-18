import { Component } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss'
})
export class ListUserComponent {

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
