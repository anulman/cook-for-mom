import Component from '@ember/component';

const TitleComponent = Component.extend({
  tagName: 'h2',
  title: null
});

TitleComponent.reopenClass({
  positionalParams: ['title']
});

export default TitleComponent;
