import { helper } from '@ember/component/helper';

export default helper(function([collection, member]) {
  return collection &&
    collection.includes instanceof Function &&
    collection.includes(member);
});
