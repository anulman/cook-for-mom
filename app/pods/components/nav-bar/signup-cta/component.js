import Component from '@ember/component';

export default Component.extend({
  tagName: 'aside',
  classNames: ['ml-3', 'ml-md-auto', 'd-inline-block'],

  email: null,
  validations: null,

  didSubmit: false,
  isNudging: false,
  onSubmit() {},
  cancelNudge() {},
});
