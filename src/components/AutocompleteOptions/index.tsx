import { ComponentProps } from "react";
import React from "react";
import { useKeyPress } from "../../hooks/useKeyPress";
import { useAutocomplete } from "../../hooks/useAutocomplete";

type AutocompleteOptionsProps = ComponentProps<"ul"> & {
  children: React.ReactNode;
};

export function AutocompleteOptions({
  children,
  ...delegated
}: AutocompleteOptionsProps) {
  const childrenArray = React.Children.toArray(children);

  const {
    activeIndex,
    activeOption,
    isOpen,
    setActiveIndex,
    setIsOpen,
    onChange,
    setSelectedOption,
  } = useAutocomplete();

  useKeyPress("ArrowDown", () => {
    if (isOpen && childrenArray.length > 0) {
      setActiveIndex(
        (prevIndex: number) => (prevIndex + 1) % childrenArray.length
      );
      setIsOpen(true);
    }
  });

  useKeyPress("ArrowUp", () => {
    if (isOpen && childrenArray.length > 0) {
      setActiveIndex((prevIndex: number) =>
        prevIndex <= 0 ? childrenArray.length - 1 : prevIndex - 1
      );
      setIsOpen(true);
    }
  });

  useKeyPress("Enter", () => {
    if (activeIndex >= 0 && activeIndex < childrenArray.length) {
      if (onChange) {
        setSelectedOption(activeOption);
        onChange(activeOption);
      }

      setIsOpen(false);
    }
  });

  if (!isOpen) {
    return null;
  }

  return (
    <ul {...delegated} id="popover" role="listbox">
      {childrenArray.map((child, index) =>
        React.cloneElement(child as React.ReactElement, { index })
      )}
    </ul>
  );
}
