import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-choose-your-recipe',
  templateUrl: './choose-your-recipe.component.html',
  styleUrls: ['./choose-your-recipe.component.scss']
})
export class ChooseYourRecipeComponent implements OnInit {
  krogerUserCode: string;
  recipes: any;
  spinnerEnabled: boolean = false;
  showSuccess: boolean = false;
  successMessage: string;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private router: Router) {
    this.route.queryParams.subscribe(params =>{
      this.krogerUserCode = params['code'];
    });
  }

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes(){
    this.httpClient.get('http://localhost:5000/Recipes').subscribe((response: any) => {
      this.recipes = response;
    });
  }

  orderRecipe(recipeIdInput: any){
    this.router.navigate(['/Order'], {queryParams: {krogerUserCode: this.krogerUserCode, recipeId: recipeIdInput}})
  }

  submitSavedIngredients(){
    this.showSuccess = false;
    this.spinnerEnabled = true;
    const requestObject = {krogerUserCode: this.krogerUserCode};

    this.httpClient.post('http://localhost:5000/SubmitSavedIngredients', requestObject).subscribe((response: any) => {
      this.spinnerEnabled = false;
      this.successMessage = 'Submitted existing ingredients to cart';
      this.showSuccess = true;
    });
  }

  deleteSavedIngredients(){
    this.showSuccess = false;
    this.spinnerEnabled = true;

    this.httpClient.delete('http://localhost:5000/DeleteSavedIngredients').subscribe((response: any) => {
      this.spinnerEnabled = false;
      this.successMessage = 'Deleted ingredients cache';
      this.showSuccess = true;
    });
  }
}
