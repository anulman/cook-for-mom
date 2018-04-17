import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

export default Mixin.create({
  asyncResource: service(),

  findRecord(store, _type, _id/*, snapshot*/) {
    let id = _id.replace(/\/$/, '');
    let opts = this.getProperties('host', 'namespace');

    return this.get('asyncResource').fetch(`${id}.json`, opts);
  }
});
