import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import SideNavigation from './SideNavigation';

const meta = {
  title: 'Example/SideNavigation',
  component: SideNavigation,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
  },
} satisfies Meta<typeof SideNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
