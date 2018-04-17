import DS from 'ember-data';
import { computed } from '@ember/object';

const { Model, attr } = DS;

export default Model.extend({
  tool: attr('string'),
  displayName: attr('string'),

  name: computed('displayName', 'tool', function() {
    return this.getWithDefault('displayName', this.get('tool'));
  })
});
