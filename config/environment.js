'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'cook-for-mom',
    podModulePrefix: 'cook-for-mom/pods',
    environment,
    rootURL: '/',
    locationType: 'router-scroll',
    historySupportMiddleware: true,

    host: 'https://cookformom.com',
    namespace: null,

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    metricsAdapters: [{
      name: 'GoogleAnalytics',
      environments: ['development', 'production'],
      config: {
        id: 'UA-114580212-1',
        debug: environment === 'development',
        trace: environment === 'development',
        sendHitTask: environment !== 'development'
      },
    }, {
      name: 'Segment',
      environments: ['production'],
      config: {
        key: 'EXy2TUHuHBr6oYlb1XGUPjI8oLreZXS5'
      }
    }, {
      name: 'FacebookPixel',
      environments: ['production'],
      config: {
        id: '190621614880504'
      }
    }],

    sentry: {
      dsn: 'https://7ab1a2d634f84f8f8cceabc074249391@app.getsentry.com/298920'
    },

    firebase: {
      apiKey: "AIzaSyABOFY23T73ge4ykKinJimFYDChmJMUoSQ",
      authDomain: "cook-for-mom.firebaseapp.com",
      databaseURL: "https://cook-for-mom.firebaseio.com",
      projectId: "cook-for-mom",
      storageBucket: "cook-for-mom.appspot.com",
      messagingSenderId: "52666927436"
    },

    routerScroll: {
      scrollElement: '#ember-application'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.host = 'http://localhost:4200';
    ENV.sentry.development = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    ENV['ember-full-story'] = {
      enabledEnvironments: ['production'],
      host: 'www.fullstory.com',
      namespace: 'FS',
      org: 'AZG9Q'
    }
  }

  return ENV;
};
