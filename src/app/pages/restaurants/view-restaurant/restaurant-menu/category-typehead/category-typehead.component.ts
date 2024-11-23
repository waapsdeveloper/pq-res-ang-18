import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject, OperatorFunction, Observable, debounceTime, distinctUntilChanged, filter, merge, map } from 'rxjs';



const states = [
	"Appetizers",
  "Soups",
  "Salads",
  "Main Courses",
  "Side Dishes",
  "Desserts",
  "Beverages",
  "Alcoholic Beverages",
  "Seafood",
  "Meat",
  "Poultry",
  "Vegan Dishes",
  "Vegetarian Dishes",
  "Gluten-Free Options",
  "Pasta",
  "Rice Dishes",
  "Grilled Foods",
  "Barbecue",
  "Street Food",
  "Breakfast Dishes",
  "Asian Cuisine",
  "Mediterranean Cuisine",
  "Mexican Cuisine",
  "Italian Cuisine",
  "Indian Cuisine",
  "Middle Eastern Cuisine",
  "Fast Food",
  "Sandwiches",
  "Burgers",
  "Pizza",
  "Specialty Drinks"
];


@Component({
  selector: 'app-category-typehead',
  templateUrl: './category-typehead.component.html',
  styleUrl: './category-typehead.component.scss'
})
export class CategoryTypeheadComponent {

  @Input() placeholder = ""
  model: any;

	@ViewChild('instance', { static: true }) instance: NgbTypeahead;

  @Output('tvalue') tvalue: EventEmitter<string> = new EventEmitter<string>();

	focus$ = new Subject<string>();
	click$ = new Subject<string>();

	search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
		const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
		const inputFocus$ = this.focus$;

		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			map((term) =>
				(term === '' ? states : states.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10),
			),
		);
	};

}
