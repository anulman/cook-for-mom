import Component from '@ember/component';
import { computed, set } from '@ember/object';
import { alias } from '@ember/object/computed';

import moment from 'moment';
import schedule from './schedule';

import Activatable from '../../../mixins/activatable';

export default Component.extend(Activatable, {
  tagName: '',

  schedule,
  dayComponent: 'index/course-calendar/day',
  activatables: alias('schedule.lessons'),

  willDestroyElement() {
    schedule.lessons.forEach((lesson) => set(lesson, 'active', false));
  },

  center: computed('schedule.{courseStart,courseEnd}', function() {
    return moment.min([
      moment.max(moment(), this.get('schedule.courseStart')),
      this.get('schedule.courseEnd')
    ]);
  }),

  isAtEarliestMonth: computed('schedule.minDate', 'center', function() {
    return this.get('schedule.minDate').isSame(this.get('center'), 'month');
  }),

  isAtLatestMonth: computed('schedule.maxDate', 'center', function() {
    return this.get('schedule.maxDate').isSame(this.get('center'), 'month');
  }),

  activate(lesson, { shouldCenter = true }) {
    this._super(lesson);

    if (shouldCenter && !lesson.date.isSame(this.get('center'), 'month')) {
      this.set('center', lesson.date);
    }
  }
});
