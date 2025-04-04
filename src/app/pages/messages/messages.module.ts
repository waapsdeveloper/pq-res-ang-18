import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { FormsModule } from '@angular/forms';
import { BtopHeaderModule } from 'src/app/components/btop-header/btop-header.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MessagesComponent],
  imports: [CommonModule, MessagesRoutingModule, SharedModule, BtopHeaderModule, FormsModule]
})
export class MessagesModule {}
