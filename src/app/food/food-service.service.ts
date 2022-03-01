import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, pipe, map } from 'rxjs';
import { Food } from '../models/food.model';

@Injectable({
  providedIn: 'root',
})
export class FoodServiceService {
  foodsSub = new BehaviorSubject<any>({});
  foods: any;
  food = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}

  getAllFood() {
    return this.http
      .get<any>('https://demo.shopketo.com/wp-json/wp/pruvitnow/food/items')
      .subscribe((foods) => {
        this.foodsSub.next(foods);
        this.foods = foods;
      });
  }

  manupulateFood() {
    this.http
      .get<any>('https://demo.shopketo.com/wp-json/wp/pruvitnow/food/items')
      .pipe(
        map((data) => {
          let food: Food[] = [];

          let productPrice: number = 0;
          let productQuantity: number = 0;
          let newProduct: boolean = false;

          for (let key in data.items) {
            for (let vari in data.variations) {
              if (vari === data.items[key].id) {
                productPrice = +data.variations[vari].var_1.mvproduct_price;
                productQuantity =
                  data.variations[vari].var_1.mvproduct_quantity;
              }
            }

            data.new_items.some(
              (el: string) =>
                (newProduct = el == data.items[key].id ? true : false)
            );

            food.push({
              name: data.items[key].name,
              id: data.items[key].id,
              type: data.items[key].type,
              subType: data.items[key].sub_type,
              mainCategory: data.items[key].main_category,
              subCategory: data.items[key].sub_category,
              proteinType: data.items[key].protein_type,
              description: data.items[key].description,
              slug: data.items[key].slug,
              tages: data.items[key].tages,
              quantity: data.items[key].quantity,
              maxQuantity: productQuantity,
              price: productPrice,
              unitSize: data.items[key].unit_size,
              unitOfMeasure: data.items[key].unit_of_measure,
              caloriesPerServing: data.items[key].calories_per_serving,
              allergens: data.items[key].allergens,
              iamgeUrl: data.items[key].image_url,
              thumbnailUrl: data.items[key].thumbnail_url,
              ingredients: data.items[key].ingredients,
              instructions: data.items[key].instructions,
              cookTimes: data.items[key].cook_times,
              nutrition: data.items[key].nutrition,
              nutritionDisclaimer: data.items[key].nutrition_disclaimer,
              freezable: data.items[key].freezable,
              isNew: newProduct,
            });
          }

          return food;
        })
      )
      .subscribe((foods: Food[]) => {
        this.foodsSub.next(foods);
        console.log(foods);
      });
  }

  getFood(food: any) {
    this.food.next(food);
  }

  getVariations(id: string) {
    if (this.foods) {
      const obj = this.foods.variations[id];
      if (obj) return obj.var_1;
    }
  }

  getFoodDiscountInfo() {
    if (this.foods) {
      const disc = this.foods.food_discount_info;
      if (disc) return disc;
    }
  }
}
