import Helper from '@ember/component/helper';
import ObjectProxy from '@ember/object/proxy';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';

import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import { Promise, defer } from 'rsvp';

const ObjectPromiseProxy = ObjectProxy.extend(PromiseProxyMixin);

export default Helper.extend({
  asyncResource: service(),
  fastboot: service(),

  init() {
    this._super(...arguments);

    if (this.get('fastboot.isFastBoot')) {
      this._fastbootLock = defer();
      this.get('fastboot').deferRendering(this._fastbootLock.promise);
    }
  },

  compute([path], { suffix = '' }) {
    let container = getOwner(this);
    let promise = new Promise((resolve, reject) => {
      let id = `template:${path}`;

      if (container.hasRegistration(id)) {
        resolve(container.lookup(id));
      }

      this.get('asyncResource').fetch(`${path}${suffix}`)
        .then((json) => {
          let wrapped = Ember.HTMLBars.template(json); // eslint-disable-line no-undef
          container.application.register(id, wrapped);

          resolve(container.lookup(id))
        })
        .catch(reject);
    });

    if (this._fastbootLock) {
      promise.finally(this._fastbootLock.resolve);
    }

    return ObjectPromiseProxy.create({ promise });
  }
});
