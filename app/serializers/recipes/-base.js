import DS from 'ember-data';
import { isPresent } from '@ember/utils';

const { JSONAPISerializer } = DS;

export default JSONAPISerializer.extend({
  pushPayload(store, payload) {
    let { id } = payload;
    let { type, attrs, rels } = this.getProperties('type', 'attrs', 'rels');
    let attributes = Object.values(attrs).reduce((_attrs, key) => {
      _attrs[key] = check(payload, key);

      return _attrs;
    }, {});

    let relationships;

    if (isPresent(rels)) {
      relationships = Object.values(rels).reduce((_rels, key) => {
        _rels[key] = { data: check(payload, key) };

        return _rels;
      }, {});
    }

    let data = { id, type, attributes, relationships };

    return this._super(store, { data });
  }
});

export function check(payload, key) {
  return payload[key] || payload[`x-${key}`];
}
