import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrl: './view-message.component.scss'
})
export class ViewMessageComponent {
  itemId;
  item;
  user;
  responseMessage: string = '';
  constructor(
    private nav: NavService,
    private network: NetworkService,
    public activatedRoute: ActivatedRoute
  ) {
    this.initialize();
  }

  async initialize() {
    console.log('yayay');
 let user = localStorage.getItem('user');
 this.user = JSON.parse(user)
 console.log(user);

    const rew = await this.activatedRoute.snapshot.params;

    this.itemId = rew['id'];

    const res = await this.network.getMessageById(this.itemId);
    console.log(res.message);

    this.item = res?.message;
  }
async  postResponse(){
    console.log(this.responseMessage);
    let obj = {
      reply_by_user_id:this.user?.id,
      content: this.responseMessage,
      restaurant_id: localStorage.getItem('restaurant_id')
    }
    let res = await this.network.replyMessage(obj,this.item?.email);
  }
}
