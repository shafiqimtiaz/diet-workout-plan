import { Box, Flex, Text } from "@chakra-ui/react";
import type { Meal } from "../types/plan";

interface MealCardProps {
  meal: Meal;
  index: number;
}

const ACCENT_STYLES = [
  { bg: "#FFF7ED", fg: "#C2410C" },
  { bg: "#EFF6FF", fg: "#1D4ED8" },
  { bg: "#F0FDFA", fg: "#0F766E" },
  { bg: "#FEF3C7", fg: "#B45309" },
];

export default function MealCard({ meal, index }: MealCardProps) {
  const accent = ACCENT_STYLES[index % ACCENT_STYLES.length];

  return (
    <Box
      bg="surface"
      borderWidth="1px"
      borderColor="border"
      borderLeftWidth="4px"
      borderLeftColor={accent.fg}
      p="1rem"
      borderRadius="8px"
      mb="1rem"
      animation="fade-in 200ms ease-out"
    >
      <Flex
        justify="space-between"
        align="center"
        gap="0.75rem"
        mb="0.5rem"
        pb="0.5rem"
        borderBottomWidth="1px"
        borderBottomStyle="dashed"
        borderBottomColor="border"
      >
        <Flex align="center" gap="0.5rem" fontWeight={700}>
          <span>{meal.icon}</span>
          <span>{meal.time}</span>
        </Flex>
        <Box
          fontFamily="mono"
          fontSize="0.85rem"
          fontWeight={600}
          px="0.5rem"
          py="0.2rem"
          borderRadius="4px"
          bg={accent.bg}
          color={accent.fg}
          whiteSpace="nowrap"
        >
          {meal.cal} cal
        </Box>
      </Flex>
      <Text fontSize="0.85rem" color="text2" mb="0.5rem">
        {meal.detail}
      </Text>
      <Box as="ul" listStyleType="none" pl={0}>
        {meal.items.map((item, i) => (
          <Flex
            as="li"
            key={i}
            align="flex-start"
            gap="0.5rem"
            fontSize="0.95rem"
            mb="0.4rem"
            css={{ overflowWrap: "anywhere" }}
          >
            <Box as="span" color="primary" fontWeight="bold">
              •
            </Box>
            <span>{item}</span>
          </Flex>
        ))}
      </Box>
    </Box>
  );
}
