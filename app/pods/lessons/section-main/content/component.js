import Component from '@ember/component';

const ContentComponent = Component.extend({
  section: null
});

ContentComponent.reopenClass({
  positionalParams: ['section']
});

export default ContentComponent;
