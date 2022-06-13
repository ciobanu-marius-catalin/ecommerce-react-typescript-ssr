import classnames from 'classnames';
import { IconParams } from './types';
import { FC } from 'react';

const Icon: FC<IconParams> = ({ name, className, ...props }) => {
  return (
    <i
      className={classnames('gravity-icon fas', `fa-${name}`, className)}
      {...props}
    />
  );
};

export { Icon };
