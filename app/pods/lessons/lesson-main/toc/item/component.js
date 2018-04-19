import Component from '@ember/component';

const TocComponent = Component.extend({
  classNames: ['toc__item'],

  href: null,
  title: null
});

TocComponent.reopenClass({
  positionalParams: ['href', 'title']
});

export default TocComponent;
