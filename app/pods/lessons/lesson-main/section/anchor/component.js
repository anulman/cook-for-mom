import Component from '@ember/component';

const AnchorComponent = Component.extend({
  tagName: '',
  slug: null
});

AnchorComponent.reopenClass({
  positionalParams: ['slug']
});

export default AnchorComponent;
