import { Component } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';

@Component({
  selector: 'app-pre-splash',
  templateUrl: './pre-splash.component.html',
  styleUrl: './pre-splash.component.scss'
})
export class PreSplashComponent {

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
      this.nav.push('/pages/dashboard')
    }, 3000)

  }
}
