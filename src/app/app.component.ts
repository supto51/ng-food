import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AddFoodService } from './food/add-food.service';
import { FoodModalComponent } from './food/food-modal/food-modal.component';
import { FoodServiceService } from './food/food-service.service';
import { FoodSortModalComponent } from './food/food-sort-modal/food-sort-modal.component';
import { AddHostDirective } from './shared/directives/addhost/add-host.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'food';
  subscriptions: Subscription[] = [];

  @ViewChild(AddHostDirective, { static: true }) addHost!: AddHostDirective;

  constructor(
    private foodService: FoodServiceService,
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.foodService.getAllFood());
  }

  ngAfterViewInit(): void {
    this.showFoodModal();
    this.showFoodShortModal();
  }

  showFoodModal() {
    this.resolver.resolveComponentFactory(FoodModalComponent);

    const hostViewContainer = this.addHost.viewContainerRef;
    hostViewContainer.clear();

    hostViewContainer.createComponent(FoodModalComponent);
  }

  showFoodShortModal() {
    this.resolver.resolveComponentFactory(FoodSortModalComponent);

    const hostViewContainer = this.addHost.viewContainerRef;
    hostViewContainer.clear();

    hostViewContainer.createComponent(FoodSortModalComponent);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }
}
