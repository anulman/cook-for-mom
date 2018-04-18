import { helper } from '@ember/component/helper';

export default helper(function([collection], { by, value }) {
  return collection.findBy(by, value);
});
