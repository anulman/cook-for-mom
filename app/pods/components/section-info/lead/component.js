import Component from '@ember/component';

const LeadComponent = Component.extend({
  tagName: 'p',
  classNames: ['lead'],

  text: null
});

LeadComponent.reopenClass({
  positionalParams: ['text']
});

export default LeadComponent;
