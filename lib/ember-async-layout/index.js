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
    switch (type) {
      case 'all': return postprocessAllTree.call(this, tree);
      default: return tree;
    }
  }
};

function postprocessAllTree(tree) {
  let remoteResourcesGlobs = [ 'hyde/**/*' ]; // todo configurable namespace
  let allTree = new Funnel(tree, {
    exclude: remoteResourcesGlobs
  });

  let remoteTemplatesTree = new Funnel(tree, {
    include: remoteResourcesGlobs,
    getDestinationPath(relativePath) {
      return relativePath.replace(/.js$/, '/compiled/ember.json');
    }
  });

  let templatesJSONTree = stew.map(remoteTemplatesTree, (content) => {
    return content
      .replace(/export default Ember.HTMLBars.template\(/, '')
      .replace(/\);$/, '');
  });

  let all = new BroccoliMergeTrees([
    allTree,
    templatesJSONTree
  ]);

  return stew.mv(all, 'hyde/', 'static/'); // todo configurable rmNamespace
}
