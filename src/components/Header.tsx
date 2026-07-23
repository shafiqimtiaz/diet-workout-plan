import { Box, chakra, Flex, Heading, HStack, Input, Spinner } from "@chakra-ui/react";
import type { SupportedLanguage } from "../types/plan";

interface HeaderProps {
  lang: SupportedLanguage;
  onToggleLang: () => void;
  calories: number;
  onCaloriesChange: (c: number) => void;
  onGenerate: () => void;
  min: number;
  max: number;
  dirty: boolean;
  loading: boolean;
}

export default function Header({
  lang,
  onToggleLang,
  calories,
  onCaloriesChange,
  onGenerate,
  min,
  max,
  dirty,
  loading,
}: HeaderProps) {
  return (
    <Box
      as="header"
      bg="surface"
      borderBottomWidth="1px"
      borderColor="border"
      position="sticky"
      top={0}
      zIndex={100}
      px="1.5rem"
      py="0.75rem"
    >
      <Flex
        maxW="1200px"
        mx="auto"
        justify="space-between"
        align="center"
        gap="1rem"
      >
        <Box>
          <Heading
            as="h1"
            fontFamily="heading"
            fontSize="1.35rem"
            fontWeight={700}
            color="text"
            display="flex"
            alignItems="center"
            gap="0.5rem"
          >
            {lang === "en"
              ? "Diet & Workout Plan"
              : "ডায়েট ও ওয়ার্কআউট প্ল্যান"}
          </Heading>
        </Box>
        <HStack gap="1rem" align="center">
          <HStack gap="0.5rem" align="center">
            <chakra.label
              htmlFor="calorie-target"
              fontSize="0.85rem"
              fontWeight={600}
              color="text2"
              whiteSpace="nowrap"
            >
              {lang === "en" ? "Target cal:" : "লক্ষ্য ক্যালোরি:"}
            </chakra.label>
            <Input
              id="calorie-target"
              type="number"
              min={min}
              max={max}
              step={50}
              value={calories}
              onChange={(e) => {
                const v = e.target.valueAsNumber;
                if (!Number.isNaN(v)) onCaloriesChange(v);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") onGenerate();
              }}
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
          </HStack>
          <chakra.button
            onClick={onGenerate}
            disabled={loading}
            title={
              dirty
                ? lang === "en"
                  ? "Plan is out of date — regenerate"
                  : "প্ল্যান পুরনো — পুনরায় তৈরি করুন"
                : lang === "en"
                  ? "Generate plan"
                  : "প্ল্যান তৈরি করুন"
            }
            aria-label={lang === "en" ? "Generate plan" : "প্ল্যান তৈরি করুন"}
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            p="0.45rem"
            borderRadius="8px"
            borderWidth="1px"
            cursor="pointer"
            transition="all 150ms ease"
            borderColor={dirty ? "#f59e0b" : "primary"}
            color={dirty ? "#b45309" : "primary"}
            bg={dirty ? "#fef3c7" : "surface"}
            animation={dirty ? "dirty-pulse 1.6s ease-in-out infinite" : undefined}
            _hover={{
              bg: dirty ? "#fde68a" : "#eff6ff",
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
            onClick={onToggleLang}
            display="inline-flex"
            alignItems="center"
            gap="0.5rem"
            px="1rem"
            py="0.5rem"
            borderRadius="8px"
            borderWidth="1px"
            borderColor="primary"
            color="primary"
            bg="surface"
            fontFamily="body"
            fontSize="0.9rem"
            fontWeight={600}
            cursor="pointer"
            transition="all 150ms ease"
            _hover={{ bg: "#eff6ff" }}
          >
            {lang === "en" ? "বাংলা" : "English"}
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
}
