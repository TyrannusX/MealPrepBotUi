import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-choose-your-recipe',
  templateUrl: './choose-your-recipe.component.html',
  styleUrls: ['./choose-your-recipe.component.scss']
})
export class ChooseYourRecipeComponent implements OnInit {
  krogerUserCode: string;
  recipes: any;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {
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

  orderRecipe(recipesId: any){
    this.httpClient.post(`http://localhost:5000/OrderStuffPlease/${this.krogerUserCode}/${recipesId}`, null).subscribe(response => {
      console.log(response);
    })
  }
}
