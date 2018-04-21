import Component from '@ember/component';
import { inject as service } from '@ember/service';

const IngredientComponent = Component.extend({
  tagName: 'li',
  classNameBindings: ['isStruckOut:is-struck-out'],

  metrics: service(),

  ingredient: null,
  isStruckOut: false,

  notesComponent: 'recipe-presenter/notes',

  click() {
    let ingredient = this.get('ingredient.ingredient');
    let recipe = this.get('ingredient.recipe.id');

    this.toggleProperty('isStruckOut');
    this.get('metrics').trackEvent('Segment', {
      event: 'toggled ingredient',
      ingredient,
      recipe
    });
  }
});

IngredientComponent.reopenClass({
  positionalParams: ['ingredient']
});

export default IngredientComponent;
