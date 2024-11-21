import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrl: './restaurant-menu.component.scss'
})
export class RestaurantMenuComponent {


  menu: any[] = [];

  constructor(private fb: FormBuilder) {

  }

  addCategory($event){

    let obj = {
      mid: this.menu.length,
      name: '',
      tempname: ''
    }

    this.menu.push(obj)

  }

  setCategory(m, $event){
    console.log($event);
    m.name = $event
  }

  setItem(o, name, price){
    o.name = name;
    o.price = price
  }



  additem(m){

    if(!m.items){
      m['items'] = [];
    }

    let c = m.items.length;
    let obj = {
      mid: c,
      name: '',
      tempname: '',
      price: 0
    }

    m.items.push(obj)

  }

  addcategory(m){

    if(!m.categories){
      m['categories'] = [];
    }

    let c = m.categories.length;
    let obj = {
      mid: c,
      name: '',
      tempname: '',
    }

    m.categories.push(obj)

  }



}
