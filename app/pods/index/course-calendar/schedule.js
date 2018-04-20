import moment from 'moment';

export const LESSONS = [{
  slug: 'knife-skills',
  title: 'Week 1: Knife Skills',
  description: '<em>Knife skills</em>, including <em>chopping</em>, <em>dicing</em>, and basic safety'
}, {
  slug: 'pan-roasting',
  title: 'Week 2: Proteins & Pan-Roasting',
  description: '3 common techniques for cooking proteins like <em>fish</em>, <em>chicken</em>, and <em>tofu</em>'
}, {
  slug: 'slow-cooking',
  title: 'Week 3: Braising & Slow-Cooking',
  description: 'Where, how, and why to <em>shop</em> for the <em>best ingredients</em> you can get'
}, {
  slug: 'continuous-kitchen',
  title: 'Week 4: The Continuous Kitchen',
  description: 'How to use your cooking by-products to run a <em>budget-friendly</em>, <em>eco-conscious</em>, <em>continuous</em> kitchen'
}, {
  slug: 'timing',
  title: 'Week 5: Timing',
  description: 'What cooking times <em>actually mean</em>'
}, {
  slug: 'meal-prep',
  title: 'Week 6: Meal Prep',
  description: 'The strategies <em>real chefs</em> use when <em>planning</em> and <em>presenting</em> tasty, Instagrammable meals'
}];

export const DATES = [
  { date: '04-02', type: 'lesson', value: findLesson('knife-skills') },
    { date: '04-05', type: 'activity', value: 1 },
    { date: '04-06', type: 'activity', value: 1 },
  { date: '04-09', type: 'lesson', value: findLesson('pan-roasting') },
    { date: '04-12', type: 'activity', value: 1 },
    { date: '04-14', type: 'activity', value: 2 },
  { date: '04-16', type: 'lesson', value: findLesson('slow-cooking') },
    { date: '04-19', type: 'activity', value: 1 },
    { date: '04-20', type: 'activity', value: 1 },
    { date: '04-21', type: 'activity', value: 2 },
  { date: '04-23', type: 'lesson', value: findLesson('continuous-kitchen') },
    { date: '04-26', type: 'activity', value: 1 },
    { date: '04-27', type: 'activity', value: 2 },
    { date: '04-28', type: 'activity', value: 1 },
  { date: '04-30', type: 'lesson', value: findLesson('timing') },
    { date: '05-04', type: 'activity', value: 1 },
    { date: '05-05', type: 'activity', value: 1 },
  { date: '05-07', type: 'lesson', value: findLesson('meal-prep') },
    { date: '05-10', type: 'activity', value: 1 },
    { date: '05-11', type: 'activity', value: 2 },
    { date: '05-12', type: 'activity', value: 2 },
  { date: '05-13', type: 'meal', value: 'Mother\'s Day!' },
];

DATES.forEach((date) => {
  if (date.type === 'lesson') {
    date.value.date = moment(date.date, 'MM-DD');
  }
});

export const COURSE_START = moment(DATES[0].date, 'MM-DD').startOf('day');
export const COURSE_END = moment(DATES[DATES.length - 1].date, 'MM-DD').endOf('day'); // eslint-disable-line max-len

export const MIN_DATE = moment.min(moment(), COURSE_START);
export const MAX_DATE = moment.max(moment(), COURSE_END);

export default {
  lessons: LESSONS,
  dates: DATES,

  courseStart: COURSE_START,
  courseEnd: COURSE_END,

  minDate: MIN_DATE,
  maxDate: MAX_DATE,

  isDayDisabled(date) {
    return !date.isBetween(MIN_DATE, MAX_DATE, 'day', '[]');
  },
};

function findLesson(slug) {
  return LESSONS.findBy('slug', slug);
}
