import { Box, Grid, Text } from "@chakra-ui/react";
import type { SupportedLanguage } from "../types/plan";
import { DAY_NAMES } from "../types/plan";

interface DaySelectorProps {
  lang: SupportedLanguage;
  activeDay: number;
  onDayChange: (day: number) => void;
}

export default function DaySelector({
  lang,
  activeDay,
  onDayChange,
}: DaySelectorProps) {
  return (
    <Grid gridTemplateColumns="repeat(7, 1fr)" gap="0.5rem" mb="1.5rem">
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
            px="0.5rem"
            py="0.75rem"
            textAlign="center"
            cursor="pointer"
            transition="all 150ms ease"
            _hover={
              active
                ? undefined
                : { borderColor: "neutral", transform: "translateY(-1px)" }
            }
          >
            <Text
              as="span"
              display="block"
              fontWeight={700}
              fontSize="1.1rem"
              mb="0.25rem"
            >
              {lang === "en" ? day.en : day.bn}
            </Text>
            <Text as="span" fontSize="0.8rem" opacity={0.8}>
              {lang === "en" ? day.fullEn : day.fullBn}
            </Text>
          </Box>
        );
      })}
    </Grid>
  );
}
