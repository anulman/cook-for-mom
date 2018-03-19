import Route from '@ember/routing/route';
import { computed } from '@ember/object';

export default Route.extend({
  headTags: computed(function() {
    return [{
      type: 'meta',
      tagId: 'meta-pinterest-verify',
      attrs: {
        property: 'p:domain_verify',
        content: 'a8d507e48a3dd3d7e3a2b68b9a79937c'
      }
    }]
  })
});
