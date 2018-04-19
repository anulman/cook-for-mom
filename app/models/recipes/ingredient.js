import DS from 'ember-data';
import { computed } from '@ember/object';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  ingredient: attr('string'),
  displayName: attr('string'),
  amounts: attr(), // is array of objects { amount, unit }
  notes: attr(), // is array of strings

  recipe: belongsTo('recipe'),
  referenceRecipe: belongsTo('recipe'),
  referenceTarget: attr('string'),

  name: computed('displayName', 'ingredient', function() {
    return this.getWithDefault('displayName', this.get('ingredient'));
  })
});
