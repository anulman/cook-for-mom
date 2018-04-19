import Component from '@ember/component';

const SectionComponent = Component.extend({
  sections: null,

  sectionComponent: 'lessons/lesson-main/section',
  fetchLayout: null // is e-c task from above
});

SectionComponent.reopenClass({
  positionalParams: ['sections']
});

export default SectionComponent;
