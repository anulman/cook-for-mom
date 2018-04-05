import Component from '@ember/component';
import { alias } from '@ember/object/computed';

import Activatable from '../../../mixins/activatable';

export default Component.extend(Activatable, {
  tagName: '',

  highlights: null, // is array
  activatables: alias('highlights'),
});
