import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from 'src/app/services/basic/nav.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.scss'
})
export class SplashComponent implements OnInit {

  loading = false;

  constructor(
    private usersService: UsersService,
    private router: Router,
  ){

  }

  ngOnInit(): void {
    this.initialize();
  }

  async initialize(){
    this.loading = true;

    // setTimeout( () => {
    //   this.loading = false;
    //   this.nav.push('/pages/login')
    // }, 3000)

    let res = await this.usersService.getLoginUserFromApi();
    console.log(res)
    if (res) {
      this.router.navigate(['/pages/pre-splash']);
    } else {
      this.router.navigate(['/pages/login']); // Redirect to role-base if no user is logged in
    }

    this.loading = false;

  }



}
