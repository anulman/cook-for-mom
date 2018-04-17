import ApplicationAdapter from '../application';
import AsyncResourceMixin from '../../mixins/async-resource-adapter'; // n.b. comes from in-repo-addon e-async-layout

export default ApplicationAdapter.extend(AsyncResourceMixin, {
  namespace: 'static/lessons'
});
