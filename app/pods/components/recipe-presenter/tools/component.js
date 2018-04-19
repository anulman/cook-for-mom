import Component from '@ember/component';

const ToolsComponent = Component.extend({
  tagName: 'ul',
  classNames: ['recipe-presenter__tools'],

  tools: null, // is array
  toolComponent: 'recipe-presenter/tool',
  notesComponent: 'recipe-presenter/notes'
});

ToolsComponent.reopenClass({
  positionalParams: ['tools']
});

export default ToolsComponent;
