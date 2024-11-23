import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject, OperatorFunction, Observable, debounceTime, distinctUntilChanged, filter, merge, map } from 'rxjs';



const states = [
	"Caesar Salad",
  "Chicken Alfredo",
  "Grilled Salmon",
  "Margherita Pizza",
  "Beef Burger",
  "Vegetable Stir-Fry",
  "Spaghetti Bolognese",
  "Chicken Tacos",
  "Shrimp Cocktail",
  "Garlic Bread",
  "Tomato Soup",
  "French Fries",
  "Chocolate Cake",
  "Cheesecake",
  "Apple Pie",
  "Ice Cream Sundae",
  "Buffalo Wings",
  "Caprese Salad",
  "Steak Fajitas",
  "Lobster Bisque",
  "Roasted Chicken",
  "Grilled Vegetables",
  "Eggplant Parmesan",
  "Fried Rice",
  "Sushi Rolls",
  "Spring Rolls",
  "Dim Sum",
  "Pad Thai",
  "Hummus and Pita",
  "Falafel",
  "Shawarma Wrap",
  "Nachos",
  "Quesadilla",
  "Fish and Chips",
  "Pancakes",
  "Omelette",
  "Club Sandwich",
  "Pulled Pork Sandwich",
  "Ramen",
  "Pho",
  "Tiramisu",
  "Crème Brûlée",
  "Margarita",
  "Mojito",
  "Iced Tea",
  "Coffee",
  "Espresso",
  "Smoothie",
  "Milkshake",
  "Hot Chocolate"
];

@Component({
  selector: 'app-product-typehead',
  templateUrl: './product-typehead.component.html',
  styleUrl: './product-typehead.component.scss'
})
export class ProductTypeheadComponent {

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
