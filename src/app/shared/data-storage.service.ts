import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor (private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes() {
    const token = this.authService.getToken();

    // this way is having your parameters in the url
    // return this.httpClient.put('https://recipeapp-55c9e.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());

    // this way is using the httpClientModule and using the params object to pass them, this keeps your URL's short
    return this.httpClient.put('https://recipeapp-55c9e.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
      params: new HttpParams().set('auth', token)
    });
  }

  getRecipes() {
    const token = this.authService.getToken();

    this.httpClient.get<Recipe[]>('https://recipeapp-55c9e.firebaseio.com/recipes.json?auth=' + token)
      .pipe(map(
        (recipes) => {
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
