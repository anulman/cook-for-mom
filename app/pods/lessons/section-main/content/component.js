import Component from '@ember/component';
import { getOwner } from '@ember/application';
import { computed } from '@ember/object';

const ContentComponent = Component.extend({
  lesson: null,
  section: null,

  layout: computed('lesson.id', 'section.slug', function() {
    let lessonId = this.get('lesson.id');
    let sectionSlug = this.get('section.slug');

    return getOwner(this)
      .lookup(`template:lessons/content/${lessonId}/sections/${sectionSlug}`);
  })
});

ContentComponent.reopenClass({
  positionalParams: ['lesson', 'section']
});

export default ContentComponent;
