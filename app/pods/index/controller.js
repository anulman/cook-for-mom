import Controller, { inject as controller } from '@ember/controller';

import BREAKPOINTS from '../../utils/breakpoints';

export default Controller.extend({
  application: controller(),

  isHeroFormShowing: true,
  computeParallaxBackgroundStyle
});

function computeParallaxBackgroundStyle(element) {
  let isBootstrapMdDown = window.innerWidth < BREAKPOINTS.md;
  let heightMultiplier = isBootstrapMdDown ? 1.5 : 2;
  let { height } = element.nextElementSibling.getBoundingClientRect();

  element.style.top = `${-0.25 * height}px`;
  element.style.height = `${heightMultiplier * height}px`;
  element.style['background-position'] = isBootstrapMdDown ?
    'bottom center' :
    'center';
}
