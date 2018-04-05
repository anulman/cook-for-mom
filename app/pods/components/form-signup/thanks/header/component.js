import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  isOnHomepage: computed(function() {
    return window.location.pathname === '/'
  })
});
