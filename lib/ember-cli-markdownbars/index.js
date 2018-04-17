/* eslint-env node */
'use strict';

const Funnel = require('broccoli-funnel');
const BroccoliMergeTrees = require('broccoli-merge-trees');
const showdown = require('showdown');
const stew = require('broccoli-stew');

module.exports = {
  name: 'ember-cli-markdownbars',

  isDevelopingAddon() {
    return true;
  },

  preprocessTree(type, tree) {
    if (type === 'template') {
      const markdownConverter = new showdown.Converter();

      let markdownBarsGlob = '**/*.mbs'
      let markdownBarsTemplates = new Funnel(tree, {
        include: [markdownBarsGlob],
        getDestinationPath(relativePath) {
          return relativePath.replace(/\.mbs$/, '.hbs');
        }
      });

      let otherTemplates = new Funnel(tree, {
        exclude: [markdownBarsGlob]
      });

      let convertedMarkdownBars = stew.map(markdownBarsTemplates, (content) => {
        return markdownConverter.makeHtml(content);
      });

      tree = new BroccoliMergeTrees([convertedMarkdownBars, otherTemplates]);
    }

    return tree;
  }
};
