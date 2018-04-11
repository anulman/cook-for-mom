import { helper } from '@ember/component/helper';

export default helper(function(collection, { by = '' }) {
  return collection.join(by);
});
