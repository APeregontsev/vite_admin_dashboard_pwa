import Comments from "./Sections/Comments/Comments";
import Albums from "./Sections/Albums/Albums";
import Posts from "./Sections/Posts/Posts";
import Photos from "./Sections/Photos/Photos";
import Overview from "./Sections/Overview/Overview";
import Settings from "./Sections/Settings/Settings";
import Subscription from "./Sections/Subscription/Subscription";
import Todos from "./Sections/Todos/Todos";
import { iconsForMenu } from "./Sidebar/Icons/IconsForMenu";

export const CONFIG_DASHBOARD: ConfigType[] = [
  {
    id: 1,
    name: "Overview",
    element: Overview,
    svgIconPath: iconsForMenu.overview,
  },
  {
    id: 2,
    name: "Todos",
    element: Todos,
    svgIconPath: iconsForMenu.tickets,
  },
  {
    id: 3,
    name: "Photos",
    element: Photos,
    svgIconPath: iconsForMenu.ideas,
  },
  {
    id: 4,
    name: "Posts",
    element: Posts,
    svgIconPath: iconsForMenu.contacts,
  },
  {
    id: 5,
    name: "Comments",
    element: Comments,
    svgIconPath: iconsForMenu.agents,
  },
  {
    id: 6,
    name: "Albums",
    element: Albums,
    svgIconPath: iconsForMenu.articles,
  },
  {
    id: 10,
    name: "Settings",
    category: "settings",
    element: Settings,
    svgIconPath: iconsForMenu.settings,
  },
  {
    id: 11,
    name: "Subscription",
    category: "settings",
    element: Subscription,
    svgIconPath: iconsForMenu.subscription,
  },
];
