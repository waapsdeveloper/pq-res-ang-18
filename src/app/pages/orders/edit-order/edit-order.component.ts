import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.scss'
})
export class EditOrderComponent implements OnInit {
  id;

  constructor(private route: ActivatedRoute){

  }

  ngOnInit() {
    // Access the parameter
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID from URL:', this.id);




  }

  initialize(){
    // Fetch the data from the server

  }

}
