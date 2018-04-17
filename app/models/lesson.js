import DS from 'ember-data';

const { Model, attr, hasMany } = DS;

export default Model.extend({
  title: attr('string'),
  headTags: attr(), // an object read from payload.meta

  highlights: hasMany('lessons/section'),
  sections: hasMany('lessons/section')
});
