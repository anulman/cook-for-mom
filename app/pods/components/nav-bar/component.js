import Component from '@ember/component';
import { bind, once } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';

export default Component.extend({
  userAgent: service(),

  tagName: 'nav',
  classNames: ['container-fluid'],

  itemsComponent: 'nav-bar/items',

  isFollowingAnchors: false,
  exitIntent: null, // optional fn
  _didTriggerExitIntent: false,

  didInsertElement() {
    if (this.get('isFollowingAnchors')) {
      setActiveAnchor.call(this);
      this._anchorChangeListener = bind(this, once, this, setActiveAnchor);

      window.addEventListener('scroll', this._anchorChangeListener, {
        capture: true,
        passive: true
      });

      window.addEventListener('resize', this._anchorChangeListener, {
        capture: true,
        passive: true
      });
    }

    if (this.get('userAgent.browser.isFirefox')) {
      this.element.style.height = this.element.clientHeight;
      this.element.style['overflow-y'] = 'hidden';
    }

    if (isPresent(this.get('exitIntent'))) {
      this._exitIntentListener = bind(this, once, this, exitIntentListener);
      this.element.addEventListener('mouseover', this._exitIntentListener, {
        capture: true,
        passive: true
      });
    }
  },

  willDestroyElement() {
    window.removeEventListener('scroll', this._anchorChangeListener, {
      capture: true,
      passive: true
    });

    window.removeEventListener('resize', this._anchorChangeListener, {
      capture: true,
      passive: true
    });

    this._anchorChangeListener = null;

    if (isPresent(this._exitIntentListener)) {
      this.element.removeEventListener('mouseover', this._exitIntentListener, {
        capture: true,
        passive: true
      });

      this._exitIntentListener = null;
    }
  }
});

function setActiveAnchor() {
  let sections = Array.from(document.querySelectorAll('section.info'));
  let anchorLinks = this.element.querySelectorAll('a');
  let minTop = window.innerHeight * .5;

  // n.b. `reverse` reverses the array in place, so we count down
  let firstVisibleIndex = (sections.length - 1) - sections.reverse()
    .findIndex((elem) => elem.getBoundingClientRect().top <= minTop);

  anchorLinks.forEach((elem, index) => {
    if (index === firstVisibleIndex) {
      if (elem !== this.element.querySelector('.active')) {
        scrollToElem.call(this, elem);
      }

      elem.classList.add('active');
    } else {
      elem.classList.remove('active');
    }
  });
}

function scrollToElem(elem) {
  let navElem = this.element.querySelector('.nav');
  let { right: ulRight } = navElem.getBoundingClientRect();
  let { left, right } = elem.getBoundingClientRect();

  if (right > ulRight) {
    navElem.scrollLeft = navElem.scrollLeft + (right - ulRight);
  } else if (left < 0) {
    navElem.scrollLeft = navElem.scrollLeft + left;
  }
}

function exitIntentListener() {
  if (this.element.getBoundingClientRect().top > 0) {
    return;
  }

  if (this.exitIntent()) {
    this.element.removeEventListener('mouseover', this._exitIntentListener, {
      capture: true,
      passive: true
    });

    this._exitIntentListener = null;
  }
}
