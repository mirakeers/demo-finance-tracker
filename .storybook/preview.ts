import type { Preview } from '@storybook/react-vite'
import '../src/index.css'
import { createElement } from 'react';
const preview: Preview = {
  decorators: [
    (Story) =>
      createElement(
        "div",
        {
          className: "bg-b-page text-t-base font-sans",
        },
        createElement(Story),
      ),
  ],
  parameters: {
    backgrounds: {
      options: {
        dark: { name: "Dark", value: "#000" },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },

  },
  initialGlobals: {
    backgrounds: { value: "dark" },
  },
};

export default preview;