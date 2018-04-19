import Component from '@ember/component';

const NoteComponent = Component.extend({
  tagName: 'li',

  note: null
});

NoteComponent.reopenClass({
  positionalParams: ['note']
});

export default NoteComponent;
