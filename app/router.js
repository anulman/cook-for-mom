import EmberRouter from '@ember/routing/router';
import config from './config/environment';

import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

import RouterScroll from 'ember-router-scroll';

const Router = EmberRouter.extend(RouterScroll, {
  location: config.locationType,
  rootURL: config.rootURL,
  metrics: service(),

  didTransition() {
    this._super(...arguments);

    if (typeof FastBoot === 'undefined') {
      trackPage(this);
    }
  }
});

Router.map(function() {
});

export default Router;

function trackPage(ctx) {
  scheduleOnce('afterRender', ctx, () => {
    const page = ctx.get('url');
    const title = ctx.getWithDefault('currentRouteName', 'unknown');

    get(ctx, 'metrics').trackPage('Segment', { page, title });
  });
}
