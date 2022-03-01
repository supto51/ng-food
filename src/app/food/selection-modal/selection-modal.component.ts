import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddFoodService } from '../add-food.service';
import { FoodServiceService } from '../food-service.service';

@Component({
  selector: 'app-selection-modal',
  templateUrl: './selection-modal.component.html',
  styleUrls: ['./selection-modal.component.css'],
})
export class SelectionModalComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  Foods: any[] = [];
  foodDiscount: any;
  variation: any;
  @Input() totalAddedToBox: number = 0;
  @Input() subTotal: number = 0;

  constructor(
    private addFoodService: AddFoodService,
    private foodService: FoodServiceService
  ) {}

  ngOnInit(): void {
    this.getFoods();
  }

  getFoods() {
    this.subscription.push(
      this.addFoodService.foods.subscribe((foods) => {
        this.Foods = [];
        for (let i = 0; i < foods.length; i++) {
          for (let j = 0; j < foods[i].quantity; j++) {
            this.Foods.push(foods[i]);
          }
        }

        this.foodDiscount = this.foodService.getFoodDiscountInfo();
      })
    );
  }

  onIncrement(food: any) {
    this.variation = this.foodService.getVariations(food.id);

    this.addFoodService.incrementQuantity(
      food,
      this.variation.mvproduct_quantity,
      this.foodDiscount
    );
  }

  onDecrement(food: any) {
    this.addFoodService.decrementQuantity(food, food);
  }

  emptySelection() {
    // localStorage.removeItem('Foods');
    // this.addFoodService.foods.next([]);
    this.addFoodService.onFoodSaveToLocal({});
    // this.addFoodService.foods.next([]);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((el) => el.unsubscribe());
  }
}
