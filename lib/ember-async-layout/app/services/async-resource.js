import Service from '@ember/service';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { isBlank, isPresent } from '@ember/utils';

import fetch from 'fetch';
import { Promise, denodeify, resolve } from 'rsvp';

const SHOEBOX_STORE_NAME = 'async-fetch';

export default Service.extend({
  fastboot: computed(function() {
    return getOwner(this).lookup('service:fastboot');
  }),

  defaultHost: computed(function() {
    let config = getOwner(this).resolveRegistration('config:environment');
    let asyncFetchConfig = config && config.asyncFetch || {};

    if (this.get('fastboot.isFastBoot')) {
      return this.get('fastboot.request.headers.headers.x-broccoli.outputPath');
    } else {
      return asyncFetchConfig.host || config.rootURL;
    }
  }),

  defaultNamespace: computed(function() {
    let config = getOwner(this).resolveRegistration('config:environment');
    let asyncFetchConfig = config && config.asyncFetch || {};

    return asyncFetchConfig.namespace || null;
  }),

  fetch(filename, {
    host = this.get('defaultHost'),
    namespace = this.get('defaultNamespace')
  } = {}) {
    let filepath = joinPath(namespace, filename);
    let file = retrieveFromShoebox.call(this, filepath);
    let url = joinPath(host, filepath);

    if (isPresent(file)) {
      return resolve(file);
    }

    if (!this.get('fastboot.isFastBoot')) {
      return readFetched(url);
    }

    return readFile(url)
      .then((content) => {
        putInShoebox.call(this, filename, content);

        return content;
      });
  },

  fetchLayout(id, path) {
    let container = getOwner(this);
    let registrationId = `template:async-layout/${id}`;

    if (container.hasRegistration(registrationId)) {
      resolve(container.lookup(registrationId));
    }

    return this.fetch(path)
      .then((json) => {
        let wrapped = Ember.HTMLBars.template(json); // eslint-disable-line no-undef

        if (!container.hasRegistration(registrationId)) {
          container.application.register(registrationId, wrapped);
        }

        return container.lookup(registrationId);
      });
  }
});

function readFile(url) {
  const fs = FastBoot.require('fs'); // eslint-disable-line no-undef
  const readFile = isPresent(fs) && denodeify(fs.readFile);

  return url.endsWith('.json') ?
    readFile(url, 'utf8').then(JSON.parse) :
    readFile(url, 'utf8');
}

function readFetched(url) {
  return fetch(url)
    .then((response) => {
      if (url.endsWith('.json')) {
        return response.json();
      } else {
        return response.blob()
          .then((blob) => new Promise((resolve, reject) => {
            let reader = new FileReader();

            reader.onloadend = function didReadMarkdown() {
              if (isPresent(reader.error)) {
                reject(reader.error);
              } else {
                resolve(reader.result);
              }
            }

            reader.readAsText(blob);
          }));
      }
    });
}

function joinPath(...args) {
  return args.compact()
    .map((value) => value.endsWith('/') ? value.slice(0, -1) : value)
    .join('/');
}

function retrieveFromShoebox(filepath) {
  let shoebox = this.get('fastboot.shoebox');
  let shoeboxStore = shoebox && shoebox.retrieve(SHOEBOX_STORE_NAME);

  return  shoeboxStore && shoeboxStore[filepath];
}

function putInShoebox(filename, content) {
  let shoebox = this.get('fastboot.shoebox');
  let shoeboxStore = shoebox && shoebox.retrieve(SHOEBOX_STORE_NAME);

  if (isPresent(shoebox)) {
    if (isBlank(shoeboxStore)) {
      shoeboxStore = {};
      shoebox.put(SHOEBOX_STORE_NAME, shoeboxStore);
    }

    shoeboxStore[filename] = content;
  }
}
