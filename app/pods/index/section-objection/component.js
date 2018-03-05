import Component from '@ember/component';

export default Component.extend({
  tagName: 'section',
  classNames: ['container-fluid', 'objection'],

  childrenClass: '',
  questionComponent: 'index/section-objection/question',
  answerComponent: 'index/section-objection/answer'
});
