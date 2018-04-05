const SECTIONS = [{
  title: 'Introduction',
  slug: 'introduction',
}, {
  title: 'Choosing a knife',
  slug: 'choosing-a-knife',
}, {
  title: 'Holding a knife',
  slug: 'holding-a-knife',
  description: 'How to <em>hold your knife</em> for maximum <em>safety</em>, comfort, and <em>control</em>',
  imageUrl: '/assets/videos/lessons/knife-skills/cut-feed.png',
  videoSources: [
    { src: '/assets/videos/lessons/knife-skills/cut-feed.webm', type: 'video/webm; codecs=vp9,vorbis' },
    { src: '/assets/videos/lessons/knife-skills/cut-feed.mp4', type: 'video/mp4' }
  ]
}, {
  title: 'Setting up a cutting board',
  slug: 'setting-up-a-cutting-board',
}, {
  title: 'The motion of your blade: the slice vs the guillotine',
  slug: 'the-motion-of-your-blade',
}, {
  title: 'Basic knife safety: the claw',
  slug: 'basic-knife-safety',
}, {
  title: 'More knife safety: flattening',
  slug: 'more-knife-safety',
}, {
  title: 'The cuts: it’s all just cubes and squares',
  slug: 'the-cuts',
  description: 'Several <em>foundational cuts</em>, including <em>strips</em>, <em>juliennes</em>, and <em>dices</em>',
  imageUrl: '/assets/images/lessons/knife-skills/cut-types.jpg'
}, {
  title: 'The basics of salad and salad dressing',
  slug: 'the-basics-of-salad-and-salad-dressing',
}, {
  title: 'Recipe: salad and dressing',
  slug: 'recipe-salad-and-dressing',
  description: 'An <em>easy</em>, delicious recipe for <em>salad</em> with homemade <em>dressing</em>',
  imageUrl: '/assets/images/lessons/knife-skills/salad-1.jpg'
}, {
  title: 'Advanced recipe: ceviche',
  slug: 'advanced-recipe-ceviche',
  description: 'A <em>simple</em> recipe for <em>ceviche</em>, a Spanish dish of <em>cold fish</em> "cooked" in <em>acid</em>',
  imageUrl: '/assets/images/lessons/knife-skills/ceviche-5.jpg'
}, {
  title: 'Homework',
  slug: 'homework',
}];

SECTIONS.highlights =[
  findSection('recipe-salad-and-dressing'),
  findSection('advanced-recipe-ceviche'),
  findSection('holding-a-knife'),
  findSection('the-cuts'),
];

export default SECTIONS;

function findSection(slug) {
  return SECTIONS.findBy('slug', slug);
}
