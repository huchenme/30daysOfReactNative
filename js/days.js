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
    hideNav: false,
    isFA: false,
    icon: "ios-stopwatch",
    size: 48,
    color: "#ff856c",
  },
  {
    day: 3,
    title: "Twitter",
    component: Day3,
    isFA: false,
    icon: "logo-twitter",
    size:50,
    color:"#2aa2ef",
    hideNav: true
  },
  {
    day: 4,
    title: "Cocoapods",
    component: Day4,
    isFA: true,
    icon: "contao",
    size:50,
    color:"#FF9A05",
    hideNav: false
  },
  {
    day: 5,
    title: "Find my location",
    component: Day5,
    isFA: false,
    icon: "ios-pin",
    size:50,
    color:"#00D204",
    hideNav: false
  },
  {
    day: 6,
    title: "Spotify",
    component: Day6,
    isFA: true,
    icon: "spotify",
    size:50,
    color:"#777",
    hideNav: true
  },
  {
    day: 8,
    title: "Swipe Menu",
    component: Day8,
    isFA: true,
    icon: "google",
    size:50,
    color:"#4285f4",
    hideNav: true
  },
  {
    day: 9,
    title: "Twitter Profile",
    component: Day9,
    isFA: false,
    icon: "ios-egg",
    size:50,
    color:"#2aa2ef",
    hideNav: true
  },
  {
    day: 17,
    title: "Fuzzy search",
    component: Day17,
    isFA: false,
    icon: "ios-search",
    size:50,
    color:"#69B32A",
    hideNav: false
  },
  {
    day: 19,
    title: "Touch ID",
    component: Day19,
    isFA: false,
    icon: "ios-log-in",
    size:50,
    color:"#fdbded",
    hideNav: false
  },
  {
    day: 20,
    title: "Reminders",
    component: Day20,
    isFA: false,
    icon: "ios-list-outline",
    size:50,
    color:"#68d746",
    hideNav: true
  },
  {
    day: 21,
    title: "Multi Reminders",
    component: Day21,
    isFA: false,
    icon: "ios-paper-outline",
    size:50,
    color:"#fe952b",
    hideNav: true
  },
  {
    day: 24,
    title: "Youtube",
    component: Day24,
    isFA: false,
    icon: "logo-youtube",
    size:50,
    color:"#e32524",
    hideNav: true
  },
  {
    day: 25,
    title: "WebView",
    component: Day25,
    isFA: false,
    icon: "ios-compass",
    size:50,
    color:"#00ab6b",
    hideNav: true
  },
  {
    day: 29,
    title: "3D Touch",
    component: Day29,
    isFA: false,
    icon: "md-menu",
    size:50,
    color:"#48f52e",
    hideNav: false
  },
];

export default days;
