import { Box, chakra, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NumberInput from "./NumberInput";

interface HeaderProps {
  calories: number;
  onCaloriesChange: (c: number) => void;
  onGenerate: () => void;
  min: number;
  max: number;
  dirty: boolean;
  loading: boolean;
}

export default function Header({
  calories,
  onCaloriesChange,
  onGenerate,
  min,
  max,
  dirty,
  loading,
}: HeaderProps) {
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.getAttribute("data-theme") === "dark"
      : false,
  );

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      document.documentElement.setAttribute("data-theme", stored);
      setDark(stored === "dark");
    }
  }, []);

  return (
    <Box
      as="header"
      bg="surface"
      borderBottomWidth="1px"
      borderColor="border"
      position="sticky"
      top={0}
      zIndex={100}
      px={{ base: "1rem", md: "1.5rem" }}
      py={{ base: "0.6rem", md: "0.75rem" }}
    >
        <Flex
          maxW="1200px"
          mx="auto"
          justify="space-between"
          align="center"
          gap={{ base: "0.75rem", md: "1rem" }}
          direction={{ base: "column", md: "row" }}
        >
          <Box>
            <Heading
              as="h1"
              fontFamily="heading"
              fontSize={{ base: "1.1rem", md: "1.35rem" }}
              fontWeight={700}
              color="text"
              display="flex"
              alignItems="center"
              gap="0.5rem"
            >
              Diet & Workout Plan
            </Heading>
          </Box>
          <Flex
            direction={{ base: "row", md: "row" }}
            wrap="wrap"
            justify="center"
            align="center"
            gap="0.5rem"
          >
            <chakra.label
              htmlFor="calorie-target"
              fontSize="0.85rem"
              fontWeight={600}
              color="text2"
              whiteSpace="nowrap"
            >
              Target cal:
            </chakra.label>
            <NumberInput
              id="calorie-target"
              value={calories}
              onChange={onCaloriesChange}
              min={min}
              max={max}
              onKeyDown={(e: any) => { if (e.key === "Enter") onGenerate(); }}
              disabled={loading}
              w="80px"
              px="0.5rem"
              py="0.4rem"
              h="auto"
              borderWidth="1px"
              borderColor="border"
              borderRadius="8px"
              fontFamily="mono"
              fontSize="0.95rem"
              fontWeight={700}
              color="primary"
              textAlign="center"
              bg="bg"
              _focus={{
                borderColor: "primary",
                boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)",
                outline: "none",
              }}
              _disabled={{ opacity: 0.6, cursor: "wait" }}
            />
            {loading && <Spinner size="sm" color="primary" borderWidth="2px" />}
          <chakra.button
            onClick={onGenerate}
            disabled={loading}
            title={dirty ? "Plan is out of date — regenerate" : "Generate plan"}
            aria-label="Generate plan"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            p="0.45rem"
            borderRadius="8px"
            borderWidth="1px"
            cursor="pointer"
            transition="all 150ms ease"
            borderColor={dirty ? "#f59e0b" : "primary"}
            color={dirty ? { _light: "#b45309", _dark: "#fbbf24" } : "primary"}
            bg={dirty ? { _light: "#fef3c7", _dark: "#422006" } : "surface"}
            animation={dirty ? "dirty-pulse 1.6s ease-in-out infinite" : undefined}
            _hover={{
              bg: dirty ? "#fde68a" : { _light: "#eff6ff", _dark: "#1e3a5f" },
            }}
            _disabled={{ opacity: 0.6, cursor: "wait" }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ display: "block" }}
            >
              <path d="M21 12a9 9 0 1 1-2.64-6.36" />
              <polyline points="21 3 21 9 15 9" />
            </svg>
          </chakra.button>
          <Box
            as="button"
            onClick={toggleDark}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            w="2.25rem"
            h="2.25rem"
            borderRadius="8px"
            borderWidth="1px"
            borderColor="border"
            color="text2"
            bg="surface"
            cursor="pointer"
            transition="all 150ms ease"
            _hover={{ borderColor: "primary", color: "primary", bg: { _dark: "#1e3a5f" } }}
          >
            {dark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </Box>
          </Flex>
        </Flex>
    </Box>
  );
}
