import { useState, useEffect } from "react";
import { Input } from "@chakra-ui/react";

interface NumberInputProps {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  [key: string]: any;
}

export default function NumberInput({
  value,
  onChange,
  min,
  max,
  ...props
}: NumberInputProps) {
  const [display, setDisplay] = useState(String(value));

  useEffect(() => {
    setDisplay(String(value));
  }, [value]);

  const commit = () => {
    const clamped = Math.max(min, Math.min(max, Number(display)));
    setDisplay(String(clamped));
    onChange(clamped);
  };

  return (
    <Input
      type="text"
      inputMode="numeric"
      value={display}
      onChange={(e) => setDisplay(e.target.value.replace(/[^0-9]/g, ""))}
      onBlur={commit}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
          commit();
          (props as any).onKeyDown?.(e);
        }
      }}
      {...props}
    />
  );
}
