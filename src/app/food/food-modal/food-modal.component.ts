import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddFoodService } from '../add-food.service';
import { FoodServiceService } from '../food-service.service';

@Component({
  selector: 'app-food-modal',
  templateUrl: './food-modal.component.html',
  styleUrls: ['./food-modal.component.css'],
})
export class FoodModalComponent implements OnInit, OnDestroy {
  food: any;
  foodSub = {} as Subscription;
  foodDiscount: any;

  constructor(
    private foodService: FoodServiceService,
    private addFoodService: AddFoodService
  ) {}

  ngOnInit(): void {
    this.foodSub = this.foodService.food.subscribe((food) => {
      this.food = food;
      this.foodDiscount = this.foodService.getFoodDiscountInfo();
    });
  }

  getPrice(): any {
    return this.foodService.getVariations(this.food.id);
  }

  getDietInfo(diet: string) {
    const dietStr = diet
      .split('_')
      .map((el) => el[0])
      .join('');
    return dietStr;
  }

  getNutri(nutrition: [any]) {
    return nutrition
      .filter(
        (e: any) =>
          e.name === 'PROTEIN' ||
          e.name === 'CARBOHYDRATES' ||
          e.name === 'CALORIES' ||
          e.name === 'TOTAL_FAT'
      )
      .reverse();
  }

  replaceInsNewLine(details: string) {
    return details.split('\n');
  }

  formatIns(ins: [any]) {
    if (!ins) return;
    return ins.map((el) => Object.values(el)).join('');
  }

  onIncrement() {
    this.addFoodService.incrementQuantity(
      this.food,
      this.food.mvproduct_quantity,
      this.foodDiscount
    );
  }

  onDecrement() {
    this.addFoodService.decrementQuantity(this.food, this.food);
  }

  ngOnDestroy(): void {
    this.foodSub.unsubscribe();
  }
}
