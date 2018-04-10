import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { inject as service } from '@ember/service';
import { bind, once } from '@ember/runloop';
import { isPresent } from '@ember/utils';

const Day = Component.extend({
  router: service(),

  classNameBindings: ['specialClass', 'isSimulatingHover:sim-hover'],

  calendar: null,
  day: null,
  nudgeSignup: function() {},

  dayString: computed('day', function() {
    return this.get('day.moment').format('MM-DD');
  }),

  specialDay: computed('calendar.schedule.dates', 'dayString', function() {
    return this.get('calendar.schedule.dates')
      .findBy('date', this.get('dayString'));
  }),

  isSpecialDay: computed.bool('specialDay'),
  isSimulatingHover: computed.reads('specialDay.value.active'),
  specialClass: computed('day.isToday', 'specialDay.type', function() {
    if (this.get('day.isToday') && this.get('specialDay.type') !== 'lesson') {
      return 'today';
    } else {
      let type = this.get('specialDay.type');

      switch (type) {
        case 'activity': return `${type}-${this.get('specialDay.value')}`;
        default: return type;
      }
    }
  }),

  didInsertElement() {
    let { calendar, specialDay } = this.getProperties('calendar', 'specialDay');

    this._onClick = bind(this, once, this, onClick);
    this.element.addEventListener('click', this._onClick, {
      capture: true,
      passive: true
    });

    if (isPresent(specialDay) && specialDay.type === 'lesson') {
      let { value: lesson } = specialDay;

      this._onMouseOver = bind(this, once, this, onMouseOver, calendar, lesson);
      this._onMouseOut = bind(this, once, this, onMouseOut, calendar, lesson);

      this.element.addEventListener('mouseover', this._onMouseOver, {
        capture: true,
        passive: true
      });

      this.element.addEventListener('mouseout', this._onMouseOut, {
        capture: true,
        passive: true
      });
    }
  },

  willDestroyElement() {
    this.element.removeEventListener('click', this._onClick, true);
    this._onClick = null;

    if (this._onMouseOver) {
      this.element.removeEventListener('mouseover', this._onMouseOver, {
        capture: true,
        passive: true
      });

      this._onMouseOver = null;
    }

    if (this._onMouseOut) {
      this.element.removeEventListener('mouseout', this._onMouseOut, {
        capture: true,
        passive: true
      });

      this._onMouseOut = null;
    }
  }
});

Day.reopenClass({
  positionalParams: ['calendar', 'day']
});

export default Day;

function onClick(/* event */) {
  let { day, specialDay } = this.getProperties('day', 'specialDay');

  if (isPresent(specialDay) && specialDay.type === 'lesson') {
    if (day.moment.isSameOrBefore(new Date(), 'day')) {
      this.get('router').transitionTo('lessons.lesson', specialDay.value.slug);
    }
  } else if (get(day, 'isToday')) {
    this.get('nudgeSignup')();
  }
}

function onMouseOver(calendar, lesson, event) {
  if (lesson.active) {
    return;
  }

  calendar.activate(lesson, {
    shouldCenter: !event.target.parentElement
      .classList.contains('ember-power-calendar-day--other-month')
  });
}

function onMouseOut(calendar, lesson, event) {
  let elem = this.element;
  let { target, relatedTarget: related } = event;

  if (!lesson.active || (elem.contains(related) && elem.contains(target))) {
    return;
  }

  calendar.deactivate(lesson);
}
