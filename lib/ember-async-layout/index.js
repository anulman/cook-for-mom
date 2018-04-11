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

  treeForTemplates(tree) {
    let asyncTemplatesTree = new Funnel('lessons', {
      include: ['**/*.hbs'],
      destDir: 'lessons/content'
    });

    return tree !== undefined ?
      new BroccoliMergeTrees([tree, asyncTemplatesTree]) :
      asyncTemplatesTree;
  },

  postprocessTree(type, tree) {
    if (type === 'template') {
      let remoteTemplatesGlob = '**/lessons/content/**/*'
      let remoteTemplates = new Funnel(tree, {
        include: [remoteTemplatesGlob],
        destDir: 'lessons',
        getDestinationPath(relativePath) {
          return relativePath
            .replace(/(.*)\/lessons\/content\//, '')
            .replace(/.js$/, '/compiled/ember.json');
        }
      });

      this.remoteTemplates = stew.map(remoteTemplates, (content) => {
        return content
          .replace(/export default Ember.HTMLBars.template\(/, '')
          .replace(/\);$/, '');
      });

      return new Funnel(tree, {
        exclude: [remoteTemplatesGlob]
      });
    } else if (type === 'all') {
      let lessonMetadata = new Funnel('lessons', {
        include: ['**/head-tags.json', '**/lesson.json'],
        destDir: 'lessons'
      });

      return new BroccoliMergeTrees([
        tree,
        lessonMetadata,
        this.remoteTemplates
      ]);
    }

    return tree;
  }
};
