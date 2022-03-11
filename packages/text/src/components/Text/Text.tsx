import * as React from 'react';

interface Props {
  text: string;
}

const Text: React.FC<Props> = (props) => {
  return <p>{props.text}</p>;
};

export { Text };
