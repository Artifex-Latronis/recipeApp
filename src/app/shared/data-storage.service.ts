import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
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
    // use this for url parameters, or HttpClientModule method, or HttpRequest Method not in 'interceptor' method.
    // const token = this.authService.getToken();

    // this way is having your parameters in the url
    // return this.httpClient.put('https://recipeapp-55c9e.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());

    // this way is using the httpClientModule and using the params object to pass them, this keeps your URL's short
    // return this.httpClient.put('https://recipeapp-55c9e.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
    //   observe: 'body',
    //   params: new HttpParams().set('auth', token)
    // });

    // this way useS 'HttpRequest' method;
    // const req = new HttpRequest(
    //   'PUT',
    //   'https://recipeapp-55c9e.firebaseio.com/recipes.json',
    //   this.recipeService.getRecipes(),
    //   {
    //     reportProgress: true,
    //     params: new HttpParams().set('auth', token)
    //   });
    // return this.httpClient.request(req);

    // this way uses interceptors for auth token
    const req = new HttpRequest(
      'PUT',
      'https://recipeapp-55c9e.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(),
      {
        reportProgress: true
      });
    return this.httpClient.request(req);

  }

  // this way is using the built in 'interceptor' feature
  // return this.httpClient.put('https://recipeapp-55c9e.firebaseio.com/recipes.json', {
  //   params: new HttpParams().set('auth', token)
  // });

  getRecipes() {
    // use this for url parameters, or HttpClientModule method, not in 'interceptor' method.
    // const token = this.authService.getToken();

    // this way is having your parameters in the url
    // this.httpClient.get<Recipe[]>('https://recipeapp-55c9e.firebaseio.com/recipes.json?auth=' + token)
    //   .pipe(map(
    //     (recipes) => {
    //       for (const recipe of recipes) {
    //         if (!recipe['ingredients']) {
    //           console.log(recipe);
    //           recipe['ingredients'] = [];
    //         }
    //       }
    //       return recipes;
    //     }
    //   ))
    //   .subscribe(
    //     (recipes: Recipe[]) => {
    //       this.recipeService.setRecipes(recipes);
    //     }
    //   );

    // this way is using the httpClientModule and using the params object to pass them, this keeps your URL's short
    // this.httpClient.get<Recipe[]>('https://recipeapp-55c9e.firebaseio.com/recipes.json',
    //   {
    //     observe: 'body',
    //     responseType: 'json',
    //     params: new HttpParams().set('auth', token)
    //   })
    //   .pipe(map(
    //     (recipes) => {
    //       for (const recipe of recipes) {
    //         if (!recipe['ingredients']) {
    //           console.log(recipe);
    //           recipe['ingredients'] = [];
    //         }
    //       }
    //       return recipes;
    //     }
    //   ))
    //   .subscribe(
    //     (recipes: Recipe[]) => {
    //       this.recipeService.setRecipes(recipes);
    //     }
    //   );

    // this way uses interceptors for auth token
    this.httpClient.get<Recipe[]>('https://recipeapp-55c9e.firebaseio.com/recipes.json',
      {
        observe: 'body',
        responseType: 'json'
      })
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
