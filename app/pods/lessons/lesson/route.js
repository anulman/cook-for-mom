import Route from '@ember/routing/route';
import { set } from '@ember/object';
import { hash } from 'rsvp';

import { inject as service } from '@ember/service';

export default Route.extend({
  asyncResource: service(),

  model({ id }) {
    let asyncResource = this.get('asyncResource');
    let basePath = `lessons/${id.replace(/\/$/, '')}`;
    let lesson = asyncResource.fetch(`${basePath}/lesson.json`);
    let headTags = asyncResource.fetch(`${basePath}/head-tags.json`);

    return hash({ lesson, headTags })
      .then(({ lesson, headTags }) => {
        this.set('headTags', headTags);

        return lesson;
      });
  },

  afterModel(model) {
    let highlights = model.highlights
      .map((slug) => model.sections.findBy('slug', slug));

    set(model.sections, 'highlights', highlights);
  },

  actions: {
    error() {
      this.replaceWith('lessons.index');
    }
  }
});
