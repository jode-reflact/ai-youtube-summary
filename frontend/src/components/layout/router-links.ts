import { faGear, faHome, faRectangleList } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface RouterLink {
  translationPath: string;
  faIcon: IconDefinition;
  route: string;
}

const routerLinks: RouterLink[] = [
  {
    translationPath: 'layout.titles.home',
    faIcon: faHome,
    route: '/',
  },
  {
    translationPath: 'layout.titles.playlists',
    faIcon: faRectangleList,
    route: '/playlists',
  },
  {
    translationPath: 'layout.titles.settings',
    faIcon: faGear,
    route: '/settings',
  },
];

export default routerLinks;
