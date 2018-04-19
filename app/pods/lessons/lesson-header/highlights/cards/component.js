import Component from '@ember/component';
import { alias } from '@ember/object/computed';

import Activatable from '../../../../../mixins/activatable';

const CardsComponent = Component.extend(Activatable, {
  highlights: null, // is array
  activatables: alias('highlights')
});

CardsComponent.reopenClass({
  positionalParams: ['highlights']
});

export default CardsComponent;
