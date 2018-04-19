import Component from '@ember/component';

const IngredientsComponent = Component.extend({
  tagName: 'ul',
  classNames: ['recipe-presenter__ingredients'],

  ingredients: null, // is array
  ingredientComponent: 'recipe-presenter/ingredient',
  notesComponent: 'recipe-presenter/notes'
});

IngredientsComponent.reopenClass({
  positionalParams: ['ingredients']
});

export default IngredientsComponent;
