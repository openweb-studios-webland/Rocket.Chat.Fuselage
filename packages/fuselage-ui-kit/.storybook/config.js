import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { withTests } from '@storybook/addon-jest';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { addDecorator, addParameters, configure } from '@storybook/react';
import { create } from '@storybook/theming';
import 'loki/configure-react';

import manifest from '../package.json';
import results from './jest-results.json';

addParameters({
  backgrounds: [
    {
      name: 'black',
      value: 'black',
    },
  ],
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  options: {
    theme: create({
      base: 'light',
      brandTitle: manifest.name,
      brandImage: 'https://rocket.chat/images/default/logo--dark.svg',
      brandUrl: manifest.homepage,
      gridCellSize: 8,
    }),
    panelPosition: 'right',
    hierarchySeparator: /\//,
    hierarchyRootSeparator: /\|/,
    // storySort: ([, a], [, b]) => {
    //   const roots = ['Fuselage', 'Buttons', 'Forms', 'Typography'];
    //   const getRootIndex = ({ kind }) => roots.findIndex((root) => kind.startsWith(`${ root }|`));
    //   return getRootIndex(a) - getRootIndex(b);
    // },
  },
  viewport: {
    viewports: {
      xs: {
        name: 'xs',
        styles: {
          width: '320px',
          height: '90%',
        },
        type: 'desktop',
      },
      sm: {
        name: 'sm',
        styles: {
          width: '600px',
          height: '90%',
        },
        type: 'desktop',
      },
      md: {
        name: 'md',
        styles: {
          width: '768px',
          height: '90%',
        },
        type: 'desktop',
      },
      lg: {
        name: 'lg',
        styles: {
          width: '1024px',
          height: '90%',
        },
        type: 'desktop',
      },
      xl: {
        name: 'xl',
        styles: {
          width: '1440px',
          height: '90%',
        },
        type: 'desktop',
      },
      ...INITIAL_VIEWPORTS,
    },
  },
});

addDecorator(withTests({ results }));

configure(() => {
  require('@rocket.chat/icons/dist/rocketchat.css');
  const componentStories = require.context('../src', true, /stories(\/index)?\.(md|js|ts)x?$/);

  return [
    ...componentStories.keys().map(componentStories)
  ].filter((module) => module.default && module.default.title);
}, module);
