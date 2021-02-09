import BSButton, { ButtonProps as BSButtonProps } from 'react-bootstrap/Button';

import { FC } from 'react';

export interface ButtonProps extends BSButtonProps {}

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return <BSButton {...props}>{children}</BSButton>;
};

export default Button;
