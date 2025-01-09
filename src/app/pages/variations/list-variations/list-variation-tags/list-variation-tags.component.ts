import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-variation-tags',
  templateUrl: './list-variation-tags.component.html',
  styleUrl: './list-variation-tags.component.scss'
})
export class ListVariationTagsComponent {

  list: any[] = [];
  private _metaValues: any;
  @Input()
  get metaValues(): any{
    return this._metaValues;
  }

  set metaValues(value: any){
    this._metaValues = value;
    this.parseValues(value)

  }

  parseValues(v){
    console.log(v);
    if(v){
      const json = JSON.parse(v);
      this.list = json as any[];
    }


  }




}
