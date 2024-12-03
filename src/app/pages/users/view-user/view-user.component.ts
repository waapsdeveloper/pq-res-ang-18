import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss'
})
export class ViewUserComponent {
 
  itemId;
  item;

}
