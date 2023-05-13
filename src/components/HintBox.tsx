import React, { useRef, useEffect } from "react";

interface HintBoxProps {
  targetRef: React.RefObject<HTMLElement>;
  position: {
    top: number;
    left: number;
  };
  visible: boolean;
  onHide: () => void;
  hint: string;
}

const HintBox: React.FC<HintBoxProps> = ({
  targetRef,
  position,
  visible,
  onHide,
  hint,
}) => {
  const hintBoxRef = useRef<HTMLDivElement>(null);

  const calculatePosition = () => {
    if (targetRef.current && hintBoxRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const left = targetRect.left - hintBoxRef.current.offsetWidth;

      return {
        top: targetRect.top,
        left: left,
      };
    }

    return { top: 0, left: 0 };
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      hintBoxRef.current &&
      !hintBoxRef.current.contains(event.target as Node) &&
      event.target !== targetRef.current
    ) {
      onHide();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onHide]);

  const hintBoxStyles = {
    ...calculatePosition(),
    display: visible && targetRef.current ? "block" : "none",
  };

  return (
    <div className="hintbox-hint" ref={hintBoxRef} style={hintBoxStyles}>
      {hint}
    </div>
  );
};

export default HintBox;