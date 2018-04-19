import Component from '@ember/component';

const StepComponent = Component.extend({
  tagName: 'li',

  step: null,

  notesComponent: 'recipe-presenter/notes'
});

StepComponent.reopenClass({
  positionalParams: ['step']
});

export default StepComponent;
