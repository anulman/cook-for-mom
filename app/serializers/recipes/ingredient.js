import Base from './-base';

export default Base.extend({
  type: 'recipes/ingredients',
  attrs: {
    ingredient: 'ingredient',
    notes: 'notes',
    displayName: 'display-name',
    referenceTarget: 'reference-target'
  },

  rels: { // eslint-disable-line ember/avoid-leaking-state-in-ember-objects
    referenceRecipe: 'reference-recipe'
  }
});
