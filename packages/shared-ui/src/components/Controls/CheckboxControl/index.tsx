import { useState, ChangeEvent, useEffect } from "react";
import { randomId } from "../../utils";
import "./index.css";

interface CheckboxProps {
  checked?: boolean;
  name?: string;
  onChange?: (checked: boolean) => void;
  desc?: string | React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const CheckboxControl = ({
  checked,
  onChange,
  name,
  desc,
  className,
  disabled,
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(!!checked);
  const inputId = randomId();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.checked);
  };

  const classNames = [
    "inp-checkbox",
    disabled ? "disabled" : null,
    className,
  ].filter(Boolean);

  useEffect(() => {
    if (isChecked !== checked) {
      setIsChecked(!!checked);
      onChange && onChange(!!checked);
    }
    // eslint-disable-next-line
  }, [checked, isChecked]);

  return (
    <div className={classNames.join(" ")}>
      <div className="flex h-6 items-center">
        <input
          id={inputId}
          name={name}
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
        />
      </div>
      {desc ? (
        <div className="pl-3 text-sm leading-6 text-gray-500">
          <label htmlFor={inputId}>{desc}</label>{" "}
        </div>
      ) : null}
    </div>
  );
};

export default CheckboxControl;
