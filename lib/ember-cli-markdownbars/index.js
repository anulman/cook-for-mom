/* eslint-env node */
'use strict';

const Funnel = require('broccoli-funnel');
const BroccoliMergeTrees = require('broccoli-merge-trees');
const showdown = require('showdown');
const stew = require('broccoli-stew');
const { compact } = require('lodash');

module.exports = {
  name: 'ember-cli-markdownbars',

  init() {
    this._super.apply(this, ...arguments);
    registerShowdownFilter();
  },

  isDevelopingAddon() {
    return true;
  },

  preprocessTree(type, tree) {
    if (type === 'template') {
      const markdownConverter = new showdown.Converter({
        extensions: ['handlebars']
      });

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

function registerShowdownFilter() {
  showdown.extension('handlebars', function() {
    let matches = [];

    return [{
      type: 'lang',
      regex: new RegExp(`{{.*}}`, 'g'),
      replace: function(found) {
        matches.push(found);

        return `%PLACEHOLDER${matches.length - 1}%`;
      }
    }, {
      type: 'output',
      regex: new RegExp(`(<p>)?%PLACEHOLDER(\\d*)%(<\\/p>)?`, 'g'),
      replace: function (found, pOpen, matchNum, pClose) {
        let match = matches[Number(matchNum)];

        if (pOpen && pClose) {
          return match;
        } else if (match.startsWith('{{#') || match.startsWith('{{/')) {
          return match;
        } else {
          return compact([pOpen, match, pClose]).join();
        }
      }
    }];
  });
}
