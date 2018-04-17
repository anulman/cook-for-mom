import Base, { check } from './recipes/-base';
import { singularize } from 'ember-inflector';
import md5 from 'md5';

const ATTRIBUTE_RELATIONSHIPS = [
  'ingredients',
  'tools',
  'steps'
];

export default Base.extend({
  normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType) { // eslint-ignore-line max-len
    payload.data.relationships = payload.data.relationships || {};

    for (let relName of ATTRIBUTE_RELATIONSHIPS) {
      let relationships = check(payload.data.attributes, relName) || [];
      let singularized = singularize(relName);

      let type = `recipes/${singularized}`
      let serializer = store.serializerFor(type);
      let data = relationships.map((rel) => {
        let relId = rel[singularized]
          .toLowerCase()
          .concat(`-${id}`);

        rel.id = md5(relId);
        serializer.pushPayload(store, rel);

        return { type, id: rel.id };
      });

      payload.data.relationships[relName] = { data };

      delete payload.data.attributes[relName];
    }

    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});
