import Component from '@ember/component';
import { computed } from '@ember/object';
import { not } from '@ember/object/computed';
import { isPresent } from '@ember/utils';
import { bind, next, once, schedule } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: 'form',

  isMobile: service(),

  isSubscriber: false,
  didReset: false,
  shouldFocusInput: not('isMobile.any'),

  onSubmit() {},
  onViewportEntered: null, // is function
  onViewportExited: null, // is function

  headerComponent: 'form-signup/header',
  mainComponent: 'form-signup/main',
  footerComponent: 'form-signup/footer',
  thanksHeaderComponent: 'form-signup/thanks/header',
  thanksMainComponent: 'form-signup/thanks/main',
  thanksFooterComponent: 'form-signup/thanks/footer',

  didInsertElement() {
    let {
      onViewportEntered: entered,
      onViewportExited: exited,
      shouldFocusInput
    } = this.getProperties(...[
      'onViewportEntered',
      'onViewportExited',
      'shouldFocusInput'
    ]);

    if ([entered, exited].any(isPresent)) {
      this._scrollListener = bind(this, once, this, checkViewport);

      window.addEventListener('scroll', this._scrollListener, {
        capture: true,
        passive: true
      });

      next(this, checkViewport);
    }

    if (shouldFocusInput) {
      next(this, focusInput, this.element);
    }
  },

  willDestroyElement() {
    window.removeEventListener('scroll', this._scrollListener, {
      capture: true,
      passive: true
    });

    this._viewportListener = null;
  },

  isSubmitted: computed('isSubscriber', 'didReset', function() {
    return this.get('isSubscriber') && !this.get('didReset');
  }),

  keydown(event) {
    switch (event.key) {
      case 'Enter': this.submit(event);
    }
  },

  submit(event) {
    event.preventDefault();

    if (this.get('onSubmit')(event) !== false) {
      this.set('didReset', false);
    }
  },

  reset() {
    this.set('didReset', true);
    schedule('afterRender', this, () => {
      this.element.querySelector('input').focus();
    });
  }
});

function checkViewport(/* event */) {
  let { top, bottom } = this.element.getBoundingClientRect();
  let callbackName = (bottom >= 0 || top >= 0) ?
    'onViewportEntered' :
    'onViewportExited';

  let callback = this.get(callbackName);

  if (callback instanceof Function) {
    callback();
  }
}

function focusInput(element) {
  let input = element.querySelector('input');

  if (isPresent(input)) {
    let { top, bottom } = input.getBoundingClientRect();
    let { scrollY, innerHeight } = window;

    if (top > 0 && bottom < scrollY + innerHeight) {
      input.focus();
    }
  }
}
