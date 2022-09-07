import React from 'react';

import { Button } from '.';

export default {
  title: 'Button',
  argTypes: { onClick: { action: 'clicked' } },
};

const Template = (args) => <Button onClick={args.onClick} />;

export const Default = Template.bind({});
