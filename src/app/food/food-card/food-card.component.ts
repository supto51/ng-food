import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { AddFoodService } from '../add-food.service';
import { FoodServiceService } from '../food-service.service';

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.css'],
})
export class FoodCardComponent implements OnInit, OnDestroy {
  @Input('food') food: any;
  @Input('newItems') newItems: string[] = [''];
  @Input() isLandingPage: boolean = false;

  variation: any;
  tempFood: any;
  foodDiscount: any;

  constructor(
    private foodService: FoodServiceService,
    private addFoodService: AddFoodService
  ) {}

  ngOnInit(): void {
    this.variation = this.foodService.getVariations(this.food.id);

    this.tempFood = this.getTempFood();
    this.foodDiscount = this.foodService.getFoodDiscountInfo();
  }

  getPrice() {
    return this.foodService.getVariations(this.food.id);
  }

  getDietInfo(diet: string): string {
    const dietStr = diet
      .split('_')
      .map((el) => el[0])
      .join('');
    return dietStr;
  }

  getDietName(diet: string): string {
    const dietStr = diet.split('_');
    for (let i = 0; i < dietStr.length; i++) {
      dietStr[i] = dietStr[i][0].toUpperCase() + dietStr[i].toLowerCase();
    }
    return dietStr.join(' ');
  }

  getTempFood() {
    let localFood: any;
    let tempFood = this.food;
    if (localStorage.getItem('Foods')) {
      localFood = JSON.parse(localStorage.getItem('Foods') || '');
      this.addFoodService.foods.next(localFood);
      localFood.forEach((el: any) => {
        if (el.id === this.food.id) tempFood = el;
      });
    }
    const newTempFood = Object.assign(tempFood, this.variation);
    return newTempFood;
  }

  onAddFood() {
    this.onIncrement();
    this.onTempToModal(this.tempFood);
  }

  onIncrement(): void {
    this.addFoodService.incrementQuantity(
      this.tempFood,
      this.variation.mvproduct_quantity,
      this.foodDiscount
    );
    this.tempFood = this.getTempFood();
  }

  onDecrement(): void {
    this.addFoodService.decrementQuantity(this.tempFood, this.food);
  }

  onFoodsToFoodBox() {
    const localFoods = localStorage.getItem('Foods');
    if (localFoods !== null) {
      return JSON.parse(localFoods);
    }
  }

  onTempToModal(food: any) {
    this.foodService.getFood(food);
  }

  ngOnDestroy(): void {}
}
