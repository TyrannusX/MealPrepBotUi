import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  krogerUserCode: string;
  recipeId: string;
  recipe: any;
  spinnerEnabled: boolean = false;

  recipeForm = new FormGroup({
    recipeName: new FormControl(''),
    description: new FormControl(''),
    ingredients: new FormArray([]),
    quantities: new FormArray([])
  });

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {
    this.route.queryParams.subscribe(params =>{
      this.krogerUserCode = params['krogerUserCode'];
      this.recipeId = params['recipeId'];

      this.getRecipeInformation();
    });
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get quantities(): FormArray {
    return this.recipeForm.get('quantities') as FormArray;
  }

  ngOnInit(): void {
  }

  removeItemAt(removalIndex: number){
    const ingredients = this.recipeForm.get('ingredients') as FormArray;
    const quantities = this.recipeForm.get('quantities') as FormArray;

    ingredients.removeAt(removalIndex);
    quantities.removeAt(removalIndex);
  }

  getRecipeInformation(){
    this.httpClient.get(`http://localhost:5000/Recipes/${this.recipeId}`).subscribe(response => {
      this.recipe = response;

      this.recipeForm.get('recipeName').setValue(this.recipe.recipeName);
      this.recipeForm.get('description').setValue(this.recipe.description);

      const ingredients = this.recipeForm.get('ingredients') as FormArray;
      const loopIngredients = this.recipe.ingredients as any[];
      loopIngredients.forEach(x => {
        ingredients.push(new FormControl(x.description));
      });

      const quantities = this.recipeForm.get('quantities') as FormArray;
      const loopQuantities = this.recipe.quantities as any[];
      loopQuantities.forEach(x => {
        quantities.push(new FormControl(x.quantity));
      });
    });
  }

  orderRecipe(){
    this.spinnerEnabled = true;
    let recipeToOrder = {
      krogerUserCode: this.krogerUserCode,
      ingredients: [],
      quantities: []
    };

    const ingredients = this.recipeForm.get('ingredients') as FormArray;
    const loopIngredients = this.recipe.ingredients as any[];
    ingredients.controls.forEach(x => {
      loopIngredients.forEach(y =>{
        if(x.value == y.description){
          recipeToOrder.ingredients.push({upc: y.upc});
        }
      });
    });

    const quantities = this.recipeForm.get('quantities') as FormArray;
    quantities.controls.forEach(x => {
      recipeToOrder.quantities.push({quantity: x.value});
    });

    console.log(recipeToOrder);
    this.httpClient.post('http://localhost:5000/OrderStuffPlease', recipeToOrder).subscribe(response => {
      this.spinnerEnabled = false;
    });
  }
}
