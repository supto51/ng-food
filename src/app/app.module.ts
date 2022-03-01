import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import '@lottiefiles/lottie-player';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodComponent } from './food/food.component';
import { SelectFoodComponent } from './food/select-food/select-food.component';
import { FoodCardComponent } from './food/food-card/food-card.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FoodBoxComponent } from './food/food-box/food-box.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FoodModalComponent } from './food/food-modal/food-modal.component';
import { LoaderComponent } from './loader/loader.component';
import { LottiePlayerDirective } from './shared/directives/lottie-player.directive';
import { FoodSortModalComponent } from './food/food-sort-modal/food-sort-modal.component';
import { SelectionModalComponent } from './food/selection-modal/selection-modal.component';
import { AddHostDirective } from './shared/directives/addhost/add-host.directive';

@NgModule({
  declarations: [
    AppComponent,
    FoodComponent,
    SelectFoodComponent,
    FoodCardComponent,
    HeaderComponent,
    FooterComponent,
    FoodBoxComponent,
    NotFoundComponent,
    FoodModalComponent,
    LoaderComponent,
    LottiePlayerDirective,
    FoodSortModalComponent,
    SelectionModalComponent,
    AddHostDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
