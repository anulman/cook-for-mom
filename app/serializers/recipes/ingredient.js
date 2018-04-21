import Base from './-base';

export default Base.extend({
  type: 'recipes/ingredients',
  attrs: {
    ingredient: 'ingredient',
    displayName: 'display-name',
    amounts: 'amounts',
    notes: 'notes',
    referenceTarget: 'reference-target'
  },

  rels: { // eslint-disable-line ember/avoid-leaking-state-in-ember-objects
    referenceRecipe: 'reference-recipe'
  }
});
