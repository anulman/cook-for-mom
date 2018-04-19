import Component from '@ember/component';

const NotesComponent = Component.extend({
  tagName: 'ul',
  classNames: ['recipe-presenter__notes'],

  notes: null, // is array
  noteComponent: 'recipe-presenter/note'
});

NotesComponent.reopenClass({
  positionalParams: ['notes']
});

export default NotesComponent;
