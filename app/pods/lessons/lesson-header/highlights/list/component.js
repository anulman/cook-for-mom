import Component from '@ember/component';
import { alias } from '@ember/object/computed';

import Activatable from '../../../../../mixins/activatable';

const ListComponent = Component.extend(Activatable, {
  highlights: null, // is array
  activatables: alias('highlights')
});

ListComponent.reopenClass({
  positionalParams: ['highlights']
});

export default ListComponent;
