import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export default helper(function([html]) {
  return htmlSafe(html);
});
