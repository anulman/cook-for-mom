import Controller from '@ember/controller';
import ObjectProxy from '@ember/object/proxy';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';

import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';

import md5 from 'md5';
import { validator, buildValidations } from 'ember-cp-validations';

const ObjectPromiseProxy = ObjectProxy.extend(PromiseProxyMixin);
const Validations = buildValidations({
  email: [
    validator('presence', true),
    validator('format', { type: 'email' })
  ]
});

export default Controller.extend(Validations, {
  fingerprintjs: service(),
  firebase: service(),
  metrics: service(),
  router: service(),

  email: '',
  fingerprint: null, // n.b. set on init
  canNudgeUser: false,
  isSubscriber: computed('fingerprintjs.fingerprint.result', isSubscriber),
  didSubmit: computed('isSubscriber.exists', function() {
    if (typeof FastBoot !== 'undefined') {
      return false;
    }

    return this.get('isSubscriber.isFulfilled') &&
      this.get('isSubscriber.exists')
  }),

  isNudging: null, // is object
  _nudgesRequested: null, // is array

  init() {
    this._super(...arguments);
    this._nudgesRequested = [];
  },

  nudge(application, topic, name) {
    application.set('isNudging', true);

    application.get('metrics').trackEvent('Segment', {
      event: 'nudge',
      topic,
      name
    });
  },

  requestNudgeFor(application, topic, name) {
    if (!application.get('canNudgeUser') || application.get('isNudging')) {
      return;
    }

    let requested = application.get('_nudgesRequested');
    let isRepeatRequest = requested.any(({ topic: _topic, name: _name }) => {
      return _topic === topic && _name === name;
    });

    if (!isRepeatRequest) {
      requested.addObject({ topic, name, timestamp: new Date() });
      application.nudge(application, topic, name);

      return true;
    }
  },

  onEmailSubmitted(application, email, source) {
    if (isBlank(email)) {
      return; // n.b. for some reason this is firing when the navbar modal closes
    }

    let distinctId = md5(email);
    let metrics = application.get('metrics');

    metrics.identify('Segment', { distinctId, email });
    metrics.trackEvent('Segment', {
      event: 'signup',
      source
    });

    application.set('didSubmit', true);
    application.get('firebase').firestore()
      .collection('signups')
      .doc(application.get('fingerprintjs.fingerprint.result'))
      .set({ createdAt: new Date().valueOf() })
      .catch((err) => {
        if (err.code === 'permission-denied') {
          return; // document exists
        }

        throw err;
      });
  },

  trackAffiliate(application, merchant, item, { target } = { target: {} }) {
    let { href } = target;

    application.get('metrics').trackEvent('Segment', {
      event: 'affiliate',
      merchant,
      item,
      href
    });
  }
});

function isSubscriber() {
  let fingerprint = this.get('fingerprintjs.fingerprint.result');
  let firebase = this.get('firebase');

  if (isBlank(fingerprint)) {
    return false;
  }

  return ObjectPromiseProxy.create({
    promise: firebase.firestore()
      .collection('signups')
      .doc(fingerprint)
      .get()
  });
}
