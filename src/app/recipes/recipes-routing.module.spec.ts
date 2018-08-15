import { RecipesRoutingModule } from './recipes-routing.module';

describe('RecipesRoutingModule', () => {
  let recipesRoutingModule: RecipesRoutingModule;

  beforeEach(() => {
    recipesRoutingModule = new RecipesRoutingModule();
  });

  it('should create an instance', () => {
    expect(recipesRoutingModule).toBeTruthy();
  });
});
