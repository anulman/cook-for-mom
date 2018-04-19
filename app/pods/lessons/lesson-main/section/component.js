import Component from '@ember/component';
import { computed } from '@ember/object';
import { defer } from 'rsvp';

const SectionComponent = Component.extend({
  section: null,
  classNames: ['lesson__section'],

  anchorComponent: 'lessons/lesson-main/section/anchor',
  layoutComponent: 'lessons/lesson-main/section/layout',
  fetchLayout: null, // is e-c task from above

  init() {
    this._super(...arguments);

    if (this.get('fastboot.isFastBoot')) {
      let lock = defer();

      setTimeout(() => {
        if (this._fastbootLock !== null) {
          alert('it me');
          lock.resolve();
        }
      }, 500);

      this._fastbootLock = lock;
      this.get('fastboot').deferRendering(lock.promise);
    }
  },

  layoutFetcher: computed(function() {
    let id = this.get('section.id');
    let lock = this._fastbootLock;
    let task = this.get('fetchLayout').perform(id);

    if (this._fastbootLock) {
      this._fastbootLock = null;
      task.finally(lock.resolve);
    }

    return task;
  })
});

SectionComponent.reopenClass({
  positionalParams: ['section']
});

export default SectionComponent;
