import Component from '@ember/component';

const TocComponent = Component.extend({
  sections: null // is array
});

TocComponent.reopenClass({
  positionalParams: ['sections']
});

export default TocComponent;
