import DS from 'ember-data';

import { host, namespace } from '../config/environment';

const { JSONAPIAdapter } = DS;

export default JSONAPIAdapter.extend({
  host,
  namespace
});
