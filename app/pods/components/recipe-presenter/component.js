import Component from '@ember/component';
import { computed } from '@ember/object';
import { isArray } from '@ember/array';

const RecipePresenter = Component.extend({
  classNames: ['recipe-presenter'],

  recipe: null,
  recipes: computed('recipe', function() {
    let recipe = this.get('recipe');
    let recipes = isArray(recipe) ? recipe : [recipe];

    return recipes.compact();
  }),

  ingredientComponent: 'recipe-presenter/ingredient',
  ingredientsComponent: 'recipe-presenter/ingredients',
  stepComponent: 'recipe-presenter/step',
  stepsComponent: 'recipe-presenter/steps',
  toolComponent: 'recipe-presenter/tool',
  toolsComponent: 'recipe-presenter/tools',
  noteComponent: 'recipe-presenter/note',
  notesComponent: 'recipe-presenter/notes'
});

RecipePresenter.reopenClass({
  positionalParams: ['recipe']
});

export default RecipePresenter;
