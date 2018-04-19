import Route from '@ember/routing/route';

export default Route.extend({
  model({ id }) {
    return this.store.findRecord('lesson', id);
  },

  afterModel(model) {
    this.set('headTags', model.get('headTags'));
  },

  actions: {
    error() {
      this.replaceWith('lessons.index');
    }
  }
});
