import Day1 from './Day1';
import Day3 from './Day3';
import Day4 from './Day4';
import Day5 from './Day5';
import Day6 from './Day6';
import Day8 from './Day8';
import Day9 from './Day9';
import Day17 from './Day17';
import Day19 from './Day19';
import Day20 from './Day20';
import Day21 from './Day21';
import Day24 from './Day24';
import Day25 from './Day25';
import Day29 from './Day29';

const days = [
  {
    day: 1,
    title: "Stopwatch",
    component: Day1,
    hideNav: false
  },
  {
    day: 3,
    title: "Twitter",
    component: Day3,
    hideNav: true
  },
  {
    day: 4,
    title: "Cocoapods",
    component: Day4,
    hideNav: false
  },
  {
    day: 5,
    title: "Find my location",
    component: Day5,
    hideNav: false
  },
  {
    day: 6,
    title: "Spotify",
    component: Day6,
    hideNav: true
  },
  {
    day: 8,
    title: "Swipe Menu",
    component: Day8,
    hideNav: true
  },
  {
    day: 9,
    title: "Twitter Profile",
    component: Day9,
    hideNav: true
  },
  {
    day: 17,
    title: "Fuzzy search",
    component: Day17,
    hideNav: false
  },
  {
    day: 19,
    title: "Touch ID",
    component: Day19,
    hideNav: false
  },
  {
    day: 20,
    title: "Reminders",
    component: Day20,
    hideNav: true
  },
  {
    day: 21,
    title: "Multi Reminders",
    component: Day21,
    hideNav: true
  },
  {
    day: 24,
    title: "Youtube",
    component: Day24,
    hideNav: true
  },
  {
    day: 25,
    title: "WebView",
    component: Day25,
    hideNav: true
  },
  {
    day: 29,
    title: "3D Touch",
    component: Day29,
    hideNav: false
  },
];

export default days;
