import Component from '@ember/component';

const HighlightsComponent = Component.extend({
  highlights: null, // is array

  cardsComponent: 'lessons/lesson-header/highlights/cards',
  listComponent: 'lessons/lesson-header/highlights/list'
});

HighlightsComponent.reopenClass({
  positionalParams: ['highlights']
});

export default HighlightsComponent;
