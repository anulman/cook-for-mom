import DS from 'ember-data';

const { JSONAPISerializer } = DS;

export default JSONAPISerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (payload.meta && payload.meta.headTags) {
      payload.data.attributes['head-tags'] = payload.meta.headTags;
      delete payload.meta.headTags;
    }

    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});
