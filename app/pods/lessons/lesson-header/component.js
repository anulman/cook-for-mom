import Component from '@ember/component';

const HeaderComponent = Component.extend({
  tagName: '',

  lesson: null,
  highlightsComponent: 'lessons/lesson-header/highlights'
});

HeaderComponent.reopenClass({
  positionalParams: ['lesson']
});

export default HeaderComponent;
