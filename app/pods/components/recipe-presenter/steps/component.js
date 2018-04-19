import Component from '@ember/component';

const StepsComponent = Component.extend({
  tagName: 'ul',
  classNames: ['recipe-presenter__steps'],

  steps: null, // is array
  stepComponent: 'recipe-presenter/step',
  notesComponent: 'recipe-presenter/notes'
});

StepsComponent.reopenClass({
  positionalParams: ['steps']
});

export default StepsComponent;
