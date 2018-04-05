import Mixin from '@ember/object/mixin';
import { set } from '@ember/object';

export default Mixin.create({
  activate(activatable) {
    this.get('activatables').forEach((_activatable) => {
      set(_activatable, 'active', _activatable === activatable);
    });
  },

  deactivate(activatable) {
    set(activatable, 'active', false);
  }
});
