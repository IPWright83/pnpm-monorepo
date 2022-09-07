import * as React from 'react';
import { log } from '@iw/log';

interface Props {
  onClick: () => void;
}

const Button: React.FC<Props> = (props) => {
  return <button {...props}>Click Me</button>;
};

log('Button Loaded');

export { Button };
