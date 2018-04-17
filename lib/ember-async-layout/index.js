/* eslint-env node */
'use strict';

const Funnel = require('broccoli-funnel');
const BroccoliMergeTrees = require('broccoli-merge-trees');
const stew = require('broccoli-stew');

module.exports = {
  name: 'ember-async-layout',

  isDevelopingAddon() {
    return true;
  },

  postprocessTree(type, tree) {
    if (type === 'template') {
      let remoteTemplatesGlobs = [ 'hyde/**/*' ];
      let localTemplates = new Funnel(tree, {
        exclude: remoteTemplatesGlobs
      });

      let remoteTemplates = new Funnel(tree, {
        include: remoteTemplatesGlobs,
        getDestinationPath(relativePath) {
          return relativePath
            .replace(/.js$/, '/compiled/ember.json');
        }
      });

      this.remoteTemplates = stew.map(remoteTemplates, (content) => {
        return content
          .replace(/export default Ember.HTMLBars.template\(/, '')
          .replace(/\);$/, '');
      });

      return localTemplates;
    } else if (type === 'all') {
      return new BroccoliMergeTrees([
        tree,
        this.remoteTemplates
      ]);
    }

    return tree;
  }
};
