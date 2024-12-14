import { ComponentProps, useEffect } from "react";
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
  const { onChange, setIsOpen, setActiveOption, activeIndex, onClose } =
    useAutocomplete();

  useEffect(() => {
    if (index === activeIndex) {
      setActiveOption(optionValue);
    }
  }, [index, activeIndex, optionValue, setActiveOption]);

  return (
    <li
      className={className}
      onClick={() => {
        setActiveOption(optionValue);
        setIsOpen(false);
        onChange(optionValue);
        if (onClose) {
          onClose();
        }
      }}
      aria-selected={index === activeIndex ? true : false}
      role="option"
    >
      {children}
    </li>
  );
}
