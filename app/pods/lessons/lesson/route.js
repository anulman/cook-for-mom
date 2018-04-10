import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';
import { set } from '@ember/object';

export default Route.extend({
  model({ id }) {
    let path = `lessons/content/${id.replace(/\/$/, '')}`;
    let owner = getOwner(this);
    let { class: headTags } = owner.factoryFor(`head-tags:${path}`);
    let { class: model } = owner.factoryFor(`lesson:${path}`);

    this.set('headTags', headTags);

    return model;
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
