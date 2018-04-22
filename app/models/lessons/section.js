import DS from 'ember-data';

const { Model, attr, belongsTo, hasMany } = DS;

export default Model.extend({
  title: attr('string'),
  slug: attr('string'),
  isLocked: attr('boolean'),
  description: attr('string'),
  imageUrl: attr('string'),
  videoSources: attr(), // an object with keys { src, type }

  recipes: hasMany('recipe'),
  lesson: belongsTo('lesson', { inverse: 'sections' })
});
