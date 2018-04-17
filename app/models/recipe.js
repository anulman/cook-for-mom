import DS from 'ember-data';

const { Model, attr, hasMany } = DS;

export default Model.extend({
  recipeName: attr('string'),
  recipeUri: attr('string'),

  ovenTemp: attr(),

  ingredients: hasMany('recipes/ingredient', { inverse: 'recipe' }),
  tools: hasMany('recipes/tool'),
  steps: hasMany('recipes/step')
});
