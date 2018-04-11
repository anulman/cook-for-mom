import Component from '@ember/component';

const AsyncLayout = Component.extend({
  tagName: '',
  layout: null // provided by outside
});

AsyncLayout.reopenClass({
  positionalParams: ['layout']
});

export default AsyncLayout;
