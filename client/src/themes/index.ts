import { draculaThemeData } from "./dracula";
import { nightOwlThemeData } from "./nightOwl";
import { monokaiThemeData } from "./monokai";
import { nordThemeData } from "./nord";
import { solarizedLightThemeData } from "./solarizedLight";
import { pastelsOnDarkThemeData } from "./pastelsOnDark";
import { tomorrowNightBlueThemeData } from "./tomorrowNightBlue";
import { tomorrowThemeData } from "./tomorrow";

export let themeOptions = [
  { value: 'light', label: 'VS Code Light' },
  { value: 'vs-dark', label: 'VS Code Dark' },
  { value: 'dracula', label: 'Dracula' },
  { value: 'night-owl', label: 'Night Owl' },
  { value: 'monokai', label: 'Monokai' },
  { value: 'nord', label: 'Nord' },
  { value: 'solarized-light', label: 'Solarized Light' },
  { value: 'pastels-on-dark', label: 'Pastels on Dark' },
  { value: 'tomorrow', label: 'Tomorrow' },
  { value: 'tomorrow-night-blue', label: 'Tomorrow Night Blue' },
];

export const themeBackGroundColors = {
  "light": {color: "#fffffe", type: "light"},
  "vs-dark": {color: "#1e1e1e", type: "dark"},
  "dracula": {color: `#${draculaThemeData["rules"][0]["background"]}`, type: "dark"},
  "night-owl": {color: `#${nightOwlThemeData["rules"][0]["background"]}`, type: "dark"},
  "monokai": {color: `#${monokaiThemeData["rules"][0]["background"]}`, type: "dark"},
  "nord": {color: `#${nordThemeData["rules"][0]["background"]}`, type: "dark"},
  "solarized-light": {color: `#${solarizedLightThemeData["rules"][0]["background"]}`, type: "light"},
  "pastels-on-dark": {color: `#${pastelsOnDarkThemeData["rules"][0]["background"]}`, type: "dark"},
  "tomorrow": {color: `#${tomorrowThemeData["rules"][0]["background"]}`, type: "light"},
  "tomorrow-night-blue": {color: `#${tomorrowNightBlueThemeData["rules"][0]["background"]}`, type: "dark"},
}

export {
  draculaThemeData,
  nightOwlThemeData,
  monokaiThemeData,
  nordThemeData,
  solarizedLightThemeData,
  pastelsOnDarkThemeData,
  tomorrowThemeData,
  tomorrowNightBlueThemeData,
}