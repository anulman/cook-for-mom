import Component from '@ember/component';

const IngredientComponent = Component.extend({
  tagName: 'li',

  ingredient: null,

  notesComponent: 'recipe-presenter/notes'
});

IngredientComponent.reopenClass({
  positionalParams: ['ingredient']
});

export default IngredientComponent;
