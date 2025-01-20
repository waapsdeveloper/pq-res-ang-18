// Angular import
import { Component, Input, OnDestroy, Inject, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { DOCUMENT } from '@angular/common';

// project import
import { Spinkit } from './spinkits';
import { GlobalLoaderState, LoadingService } from 'src/app/services/basic/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss', './spinkit-css/sk-line-material.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnDestroy {
  // public props
  isSpinnerVisible = true;
  Spinkit = Spinkit;
  @Input() backgroundColor = '#2689E2';
  @Input() spinner = Spinkit.skLine;
  // Constructor
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private loaderService: LoadingService
  ) {
    this.loaderService.getLoader().subscribe((data) => {
      console.log(data);
      this.isSpinnerVisible = data.loader;
    });
    // this.router.events.subscribe(
    //   (event) => {
    //     if (event instanceof NavigationStart) {
    //       this.isSpinnerVisible = true;
    //     } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
    //       this.isSpinnerVisible = false;
    //     }
    //   },
    //   () => {
    //     this.isSpinnerVisible = false;
    //   }
    // );
  }

  // life cycle event
  ngOnDestroy(): void {
    this.isSpinnerVisible = false;
  }
}
