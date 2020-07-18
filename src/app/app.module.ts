import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { KrogerRedirectComponent } from './kroger-redirect/kroger-redirect.component';
import { ChooseYourRecipeComponent } from './choose-your-recipe/choose-your-recipe.component';
import { SearchProductsComponent } from './search-products/search-products.component';
import { RecipeComponent } from './recipe/recipe.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    KrogerRedirectComponent,
    ChooseYourRecipeComponent,
    SearchProductsComponent,
    RecipeComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
