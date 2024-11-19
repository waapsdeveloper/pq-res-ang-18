import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.scss'
})
export class SplashComponent implements OnInit {

  loading = false;

  constructor(private nav: NavService){

  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(){
    this.loading = true;

    setTimeout( () => {
      this.loading = false;
      this.nav.push('/pages/login')
    }, 3000)

  }



}
