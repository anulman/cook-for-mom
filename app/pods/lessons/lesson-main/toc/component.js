import Component from '@ember/component';
import { bind, once } from '@ember/runloop';

const TocComponent = Component.extend({
  classNames: ['toc'],

  sections: null,

  itemComponent: 'lessons/lesson-main/toc/item',

  didInsertElement() {
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
  }
});

TocComponent.reopenClass({
  positionalParams: ['sections']
});

export default TocComponent;

function setActiveAnchor() {
  let ids = this.get('sections')
    .map((section) => `#${section.get('slug')}`)
    .join(',');

  let sections = Array.from(document.querySelectorAll(ids));
  let anchorLinks = this.element.querySelectorAll('.toc__item');
  let minTop = window.innerHeight / 2;

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
  let element = this.element;
  let navElem = element.querySelector('.nav');
  let { right: ulRight } = navElem.getBoundingClientRect();
  let { left, right } = elem.getBoundingClientRect();

  if (right > ulRight) {
    navElem.scrollLeft = navElem.scrollLeft + (right - ulRight);
  } else if (left < 0) {
    navElem.scrollLeft = navElem.scrollLeft + left;
  }
}
