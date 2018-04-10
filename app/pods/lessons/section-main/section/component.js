import Component from '@ember/component';

const SectionComponent = Component.extend({
  section: null,
  contentComponent: 'lessons/section-main/section/content'
});

SectionComponent.reopenClass({
  positionalParams: ['section']
});

export default SectionComponent;
