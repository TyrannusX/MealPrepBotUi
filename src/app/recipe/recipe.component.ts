import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  recipeForm = new FormGroup({
    recipeName: new FormControl(''),
    description: new FormControl(''),
    ingredients: new FormArray([
    ]),
    quantities: new FormArray([

    ])
  });

  ingredientsList: any;

  spinnerEnabled: boolean = false;
  showSuccess: boolean = false;
  successMessage: string;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.loadAllIngredients();
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get quantities(): FormArray {
    return this.recipeForm.get('quantities') as FormArray;
  }

  addIngredientInput(){
    const ingredientControls = this.recipeForm.get('ingredients') as FormArray;
    ingredientControls.push(new FormControl(''));

    const quantities = this.recipeForm.get('quantities') as FormArray;
    quantities.push(new FormControl(''));
  }

  removeIngredient(){
    const ingredientControls = this.recipeForm.get('ingredients') as FormArray;
    ingredientControls.removeAt(ingredientControls.length - 1);

    const quantities = this.recipeForm.get('quantities') as FormArray;
    quantities.removeAt(quantities.length - 1);
  }

  loadAllIngredients(){
    this.httpClient.get('http://localhost:5000/Products').subscribe((response: any) =>{
      this.ingredientsList = response;
    });
  }

  submitRecipe(){
    this.showSuccess = false;
    this.spinnerEnabled = true;
    let recipeObject: any = {
      recipeName: this.recipeForm.get('recipeName').value,
      description: this.recipeForm.get('description').value,
      ingredients: [],
      quantities: []
    };

    const ingredientControls = this.recipeForm.get('ingredients') as FormArray;
    ingredientControls.controls.forEach(x =>{
      const loopIngredientsList = this.ingredientsList as any[];
      loopIngredientsList.forEach(y => {
        if(y.upc === x.value){
          recipeObject.ingredients.push({upc: x.value, description: y.description});
        }
      });
    });

    const quantities = this.recipeForm.get('quantities') as FormArray;
    quantities.controls.forEach(x =>{
      recipeObject.quantities.push({quantity: x.value});
    });

    this.httpClient.post('http://localhost:5000/AddRecipeToDb', recipeObject).subscribe(response => {
      this.spinnerEnabled = false;
      this.showSuccess = true;
      this.successMessage = 'Added Recipe Successfully';
    });
  }
}
