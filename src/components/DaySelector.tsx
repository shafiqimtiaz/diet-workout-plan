import { Box, Flex, Text } from "@chakra-ui/react";
import { DAY_NAMES } from "../types/plan";

interface DaySelectorProps {
  activeDay: number;
  onDayChange: (day: number) => void;
}

export default function DaySelector({
  activeDay,
  onDayChange,
}: DaySelectorProps) {
  return (
    <Flex
      gap="0.5rem"
      mb="1.5rem"
      overflowX="auto"
      css={{ scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}
    >
      {DAY_NAMES.map((day, i) => {
        const active = activeDay === i;
        return (
            <Box
              as="button"
              key={i}
              onClick={() => onDayChange(i)}
              bg={active ? "primary" : "surface"}
              borderWidth="1px"
              borderColor={active ? "primary" : "border"}
              color={active ? "#ffffff" : "text"}
              borderRadius="10px"
              py="0.75rem"
              textAlign="center"
              cursor="pointer"
              transition="all 150ms ease"
              flexShrink={0}
              minW="5rem"
              px="0.75rem"
              _hover={
                active
                  ? undefined
                  : { borderColor: "neutral" }
              }
            >
            <Text
              as="span"
              display="block"
              fontWeight={700}
              fontSize="1.1rem"
              mb="0.25rem"
              whiteSpace="nowrap"
            >
              {day.short}
            </Text>
            <Text as="span" fontSize="0.8rem" opacity={0.8} whiteSpace="nowrap">
              {day.full}
            </Text>
          </Box>
        );
      })}
    </Flex>
  );
}
