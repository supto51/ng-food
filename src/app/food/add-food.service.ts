import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddFoodService {
  foods = new BehaviorSubject<any>([]);

  constructor() {}

  incrementQuantity(tempFood: any, quntLmt: number, maxBoxSize?: any) {
    const { items_per_box, max_boxes } = maxBoxSize;
    const Foods = localStorage.getItem('Foods') ?? '';
    let totalQty: number = 0;

    if (Foods.length !== 0) {
      JSON.parse(Foods).forEach((el: any) => (totalQty += el.quantity));
    }

    if (totalQty < items_per_box * max_boxes) {
      if (tempFood.quantity < quntLmt) {
        if (!Foods) {
          localStorage.setItem('Foods', JSON.stringify([tempFood]));
        }

        tempFood.quantity++;
      }

      this.onFoodSaveToLocal(tempFood);
    }
  }

  decrementQuantity(tempFood: any, food: any) {
    let Foods = [];
    let totalQty: number = 0;
    const localFoods = localStorage.getItem('Foods');
    if (!(localFoods === null) && localFoods) {
      Foods = JSON.parse(localFoods);
    }

    Foods.forEach((el: any) => (totalQty += el.quantity));

    if (tempFood.id === food.id) {
      tempFood.quantity--;
      if (tempFood.quantity < 1) {
        const foodIndex = Foods.findIndex((el: any) => el.id === tempFood.id);
        Foods.splice(foodIndex, 1);
        localStorage.setItem('Foods', JSON.stringify(Foods));
        this.foods.next(Foods);
        return;
      }

      this.onFoodSaveToLocal(tempFood);
    }
  }

  onFoodSaveToLocal(food: any) {
    const foods = localStorage.getItem('Foods');

    let Foods = JSON.parse(foods ? foods : '');

    if (!Foods) {
      Foods = [];
    }

    if (Foods.length !== 0) {
      const foodIndex = Foods.findIndex((el: any) => el.id === food.id);
      if (foodIndex !== -1) {
        Foods[foodIndex] = food;
      } else {
        Foods.push(food);
      }
    } else {
      Foods.push(food);
    }

    this.foods.next(Foods);
    localStorage.setItem('Foods', JSON.stringify(Foods));
  }
}
