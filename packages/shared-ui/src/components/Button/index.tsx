import { HTMLAttributes } from "react";
import { LoadingSpinner } from "../Loading";
import "./index.css";

type ButtonBaseAttrs = HTMLAttributes<HTMLButtonElement>;
type ButtonBaseAttrsFilter = Pick<
  ButtonBaseAttrs,
  | "onMouseUp"
  | "onMouseDown"
  | "onClick"
  | "onSubmit"
  | "onKeyPress"
  | "onKeyUp"
  | "onKeyDown"
>;

interface IButtonProps {
  title?: string;
  primary?: boolean;
  danger?: boolean;
  warn?: boolean;
  leadingIcon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  block?: boolean;
  size?: "sm" | "base" | "lg";
	type?: "button" | "reset" | "submit"
}

type ButtonPropsWithoutDuplicate = Omit<
  ButtonBaseAttrsFilter,
  keyof IButtonProps
>;

type ButtonProps = IButtonProps & ButtonPropsWithoutDuplicate;

const Button = ({
  title,
  primary,
  danger,
  warn,
  block,
  size = "base",
	type = "button",
  leadingIcon,
  loading,
  disabled,
  className,
  ...otherProps
}: ButtonProps) => {
  const classes = [
    "btn",
    primary && "btn-primary",
    danger && "btn-danger",
    warn && "btn-warning",
    block && "block",
    title ? "" : "notitle",
    size,
    className,
  ].filter(Boolean);



  return (
    <button type={type} className={classes.join(" ")} disabled={disabled} {...otherProps}>
      {leadingIcon && !loading ? leadingIcon : null}
      {loading ? <LoadingSpinner /> : null}
      {title}
    </button>
  );
};

export default Button;
