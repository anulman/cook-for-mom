import Component from '@ember/component';

export default Component.extend({
  classNames: ['nav-wrapper'],

  itemComponent: 'nav-bar/items/item',
  linkToComponent: 'nav-bar/items/link-to'
});
