import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//COMPONENTS
import { NavbarComponent } from "./navbar/navbar.component";
import { HorizontalMenuComponent } from './horizontal-menu/horizontal-menu.component';
import { VerticalMenuComponent } from "./vertical-menu/vertical-menu.component";

//DIRECTIVES
import { ToggleFullscreenDirective } from "./directives/toggle-fullscreen.directive";
import { SidebarLinkDirective } from './directives/sidebar-link.directive';
import { SidebarDropdownDirective } from './directives/sidebar-dropdown.directive';
import { SidebarAnchorToggleDirective } from './directives/sidebar-anchor-toggle.directive';
import { SidebarDirective } from './directives/sidebar.directive';
import { TopMenuDirective } from './directives/topmenu.directive';
import { TopMenuLinkDirective } from './directives/topmenu-link.directive';
import { TopMenuDropdownDirective } from './directives/topmenu-dropdown.directive';
import { TopMenuAnchorToggleDirective } from './directives/topmenu-anchor-toggle.directive';
import { FooterComponent } from './footer/footer.component';
import { FullLayoutComponent } from '../layouts/full/full-layout.component';


@NgModule({
    exports: [
        CommonModule,
        NavbarComponent,
        VerticalMenuComponent,
        HorizontalMenuComponent,
        ToggleFullscreenDirective,
        SidebarDirective,
        TopMenuDirective,
        NgbModule,
        FooterComponent,
        FullLayoutComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        FormsModule,
        OverlayModule,
        ReactiveFormsModule,
    ],
    declarations: [
        NavbarComponent,
        VerticalMenuComponent,
        HorizontalMenuComponent,
        ToggleFullscreenDirective,
        SidebarLinkDirective,
        SidebarDropdownDirective,
        SidebarAnchorToggleDirective,
        SidebarDirective,
        TopMenuLinkDirective,
        TopMenuDropdownDirective,
        TopMenuAnchorToggleDirective,
        TopMenuDirective,
        FooterComponent,
        FullLayoutComponent
    ]
})
export class SharedModule { }
