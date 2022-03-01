import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FoodServiceService } from './food-service.service';

declare var $: any;
declare var foodLandSlide: () => any;
declare var loadTypeText: () => any;

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
})
export class FoodComponent implements OnInit, OnDestroy {
  foods: any;
  newItems: [string] = [''];
  height: any;

  subscriptions: Subscription[] = [];

  constructor(private foodService: FoodServiceService) {}

  ngOnInit(): void {
    this.getFoods();

    this.height = this.getNavHeight();
  }

  getNavHeight() {
    return document.querySelector('.sk-header')?.getBoundingClientRect().height;
  }

  getFoods() {
    this.subscriptions.push(
      this.foodService.foodsSub.subscribe((foods) => {
        if (foods.items && foods.new_items) {
          foods.items.forEach((el: any) => (el.quantity = 0));

          this.newItems = foods.new_items;

          this.foods = foods.items;

          //calling slider
          $(document).ready(() => foodLandSlide());
          loadTypeText();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }
}
