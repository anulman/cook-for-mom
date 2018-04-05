import Component from '@ember/component';
import { isPresent } from '@ember/utils';
import { bind, once } from '@ember/runloop';

export default Component.extend({
  tagName: 'section',
  classNames: ['container-fluid', 'info'],

  contentComponent: 'section-info/content',
  titleComponent: 'section-info/title',
  leadComponent: 'section-info/lead',

  onScrollOutBottom: null, // is function

  didInsertElement() {
    if (isPresent(this.get('onScrollOutBottom'))) {
      this._scrollListener = bind(this, once, this, onScroll);
      window.addEventListener('scroll', this._scrollListener, {
        capture: true,
        passive: true
      });
    }
  },

  willDestroyElement() {
    if (isPresent(this._scrollListener)) {
      window.removeEventListener('scroll', this._scrollListener, {
        capture: true,
        passive: true
      });

      this._scrollListener = null;
    }
  }
});

function onScroll(/* event */) {
  let { bottom } = this.element.getBoundingClientRect();

  if (bottom < 0) {
    this.get('onScrollOutBottom')();
  }
}
