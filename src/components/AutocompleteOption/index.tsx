import { ComponentProps, useEffect, useRef } from "react";
import { useAutocomplete } from "../../hooks/useAutocomplete";

type AutocompleteOptionsProps = ComponentProps<"li"> & {
  className: string;
  children: React.ReactNode;
  optionValue: unknown;
  index?: number;
};

export function AutocompleteOption({
  className,
  children,
  optionValue,
  index,
}: AutocompleteOptionsProps) {
  const ref = useRef<HTMLLIElement>(null);
  const {
    onChange,
    setIsOpen,
    setActiveOption,
    activeIndex,
    onClose,
    setSelectedOption,
  } = useAutocomplete();

  useEffect(() => {
    if (index === activeIndex) {
      setActiveOption(optionValue);
    }
  }, [index, activeIndex, optionValue, setActiveOption]);

  useEffect(() => {
    if (index === activeIndex && ref.current) {
      ref.current.scrollIntoView({ behavior: "instant", block: "nearest" });
    }
  }, [activeIndex, index]);

  return (
    <li
      className={className}
      onClick={() => {
        setActiveOption(optionValue);
        setSelectedOption(optionValue);
        setIsOpen(false);
        onChange(optionValue);
        if (onClose) {
          onClose();
        }
      }}
      aria-selected={index === activeIndex ? true : false}
      role="option"
      ref={ref}
    >
      {children}
    </li>
  );
}
