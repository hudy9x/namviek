import { useEffect, useRef } from "react";

interface Props {
  onOutsideClick: () => void;
  children: JSX.Element | JSX.Element[];
}

export const OutsideClickHandler = ({ onOutsideClick, children }: Props) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current) {
        return
      }
      if (!wrapperRef.current.contains(event.target as HTMLElement)) {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [children, onOutsideClick, wrapperRef]);

  return (
    <div ref={wrapperRef}>
      {children}
    </div>
  )
}
