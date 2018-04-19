import Component from '@ember/component';

const ToolComponent = Component.extend({
  tagName: 'li',

  tool: null,

  notesComponent: 'recipe-presenter/notes'
});

ToolComponent.reopenClass({
  positionalParams: ['tool']
});

export default ToolComponent;
