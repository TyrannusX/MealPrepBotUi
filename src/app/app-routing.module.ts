import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KrogerRedirectComponent } from './kroger-redirect/kroger-redirect.component';
import { ChooseYourRecipeComponent } from './choose-your-recipe/choose-your-recipe.component';
import { SearchProductsComponent } from './search-products/search-products.component';
import { RecipeComponent } from './recipe/recipe.component';
import { OrderComponent } from './order/order.component';


const routes: Routes = [
  {path: 'SearchProducts', component: SearchProductsComponent},
  {path: 'GoToKroger', component: KrogerRedirectComponent},
  {path: 'ChooseYourRecipe', component: ChooseYourRecipeComponent},
  {path: 'BuildRecipe', component: RecipeComponent},
  {path: 'Order', component: OrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
