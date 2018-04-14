import Component from '@ember/component';

const ItemComponent = Component.extend({
  tagName: 'li',
  classNames: ['nav-item'],

  label: null,
  href: null,
  model: null,
  disabled: false
});

ItemComponent.reopenClass({
  positionalParams: ['label', 'href', 'model']
});

export default ItemComponent;
