import Controller, { inject as controller } from '@ember/controller';

import sections from './sections';

export default Controller.extend({
  lessons: controller(),

  sections
});
