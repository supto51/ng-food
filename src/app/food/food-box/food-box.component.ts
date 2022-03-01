import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddFoodService } from '../add-food.service';
import { FoodServiceService } from '../food-service.service';

@Component({
  selector: 'app-food-box',
  templateUrl: './food-box.component.html',
  styleUrls: ['./food-box.component.css'],
})
export class FoodBoxComponent implements OnInit, OnDestroy {
  Foods: any;
  subscriptions: Subscription[] = [];
  totalAddedToBox: number = 0;
  foodDiscount: any;
  subTotal: number = 0;

  constructor(
    private addFood: AddFoodService,
    private foodService: FoodServiceService
  ) {}

  ngOnInit(): void {
    this.getFoods();

    this.foodDiscount = this.foodService.getFoodDiscountInfo();
  }

  getFoods() {
    this.subscriptions.push(
      this.addFood.foods.subscribe((foods) => {
        this.Foods = foods;

        this.subTotal = this.getSubTotal(foods);

        this.totalAddedToBox = this.getAddToBoxTotal();
      })
    );
  }

  getAddToBoxTotal(): number {
    let newTotal: number = 0;
    if (this.Foods.length === 0) return 0;
    for (let i = 0; i < this.Foods.length; i++) {
      newTotal += this.Foods[i].quantity;
    }

    return newTotal;
  }

  getSubTotal(foods: any): number {
    let price: number = 0;

    foods.filter((el: any) => (price += +el.mvproduct_price * el.quantity));

    return +price.toFixed(2);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }
}
