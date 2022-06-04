import classnames from 'classnames';

const Icon = ({ name, className, ...props }) => {
  return (
    <i
      className={classnames('gravity-icon fas', `fa-${name}`, className)}
      {...props}
    />
  );
};

export { Icon };
