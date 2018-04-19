import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

const ContentSection = Component.extend({
  tagName: '',

  asyncResource: service(),

  lesson: null,
  tocComponent: 'lessons/lesson-main/toc',
  sectionsComponent: 'lessons/lesson-main/sections',

  fetchLayout: task(function*(id) {
    let path = `static/lessons/${id}/compiled/ember.json`;

    // todo: retry strategy
    // todo: trigger conditionally on display
    return yield this.get('asyncResource').fetchLayout(id, path);
  }).maxConcurrency(3).enqueue()
});

ContentSection.reopenClass({
  positionalParams: ['lesson']
});

export default ContentSection;
