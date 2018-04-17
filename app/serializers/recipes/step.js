import Base from './-base';

export default Base.extend({
  type: 'recipes/steps',
  attrs: {
    step: 'step',
    notes: 'notes',
    imageUrl: 'image-url'
  }
});
