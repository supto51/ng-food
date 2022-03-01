import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AddHostDirective } from 'src/app/shared/directives/addhost/add-host.directive';
import { FoodModalComponent } from '../food-modal/food-modal.component';
import { FoodServiceService } from '../food-service.service';

@Component({
  selector: 'app-select-food',
  templateUrl: './select-food.component.html',
  styleUrls: ['./select-food.component.css'],
})
export class SelectFoodComponent implements OnInit, OnDestroy, AfterViewInit {
  subscription: Subscription[] = [];
  foods: any;
  allFoods: any;
  newItems: [string] = [''];
  today: string = '';
  isSubCategory: string = 'ALL';

  @ViewChild(AddHostDirective) addHost!: AddHostDirective;

  count: number = 0;

  constructor(
    private foodService: FoodServiceService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.getFoods();
  }

  getFoods() {
    this.subscription.push(
      this.foodService.foodsSub.subscribe((foods) => {
        if (foods.items) {
          foods.items.forEach((el: any) => (el.quantity = 0));
        }

        this.foods = foods;
        this.allFoods = foods.items;
        this.newItems = foods.new_items;
      })
    );
  }

  filterFood(subCategory: string) {
    const newItems: any[] = [];
    if (this.allFoods)
      this.allFoods.filter((el: any) => {
        this.foods.items = [];
        this.isSubCategory = subCategory;
        if (subCategory === 'ALL') {
          newItems.push(el);
        }

        if (el.sub_category === subCategory) {
          newItems.push(el);
        }
        this.foods.items = newItems;
      });
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.subscription.forEach((el) => el.unsubscribe());
  }
}
