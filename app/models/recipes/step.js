import DS from 'ember-data';

const { Model, attr } = DS;

export default Model.extend({
  step: attr('string'),
  imageUrl: attr('string'),
  imagePosition: attr('string'),
  notes: attr() // is array of strings
});
