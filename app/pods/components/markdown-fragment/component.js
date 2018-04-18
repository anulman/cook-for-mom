import Markdown from 'ember-cli-showdown/components/markdown-to-html';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Markdown.extend({
  tagName: '',
  htmlFragment: computed('html', function() {
    let htmlString = this.get('html.string')
      .replace(/^<p>/, '')
      .replace(/<\/p>/, '');

    return htmlSafe(htmlString);
  })
});
