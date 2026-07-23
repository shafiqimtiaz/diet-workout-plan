import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import type { SupportedLanguage, DayPlan } from "../types/plan";
import { DAY_NAMES } from "../types/plan";

interface DaySummaryProps {
  lang: SupportedLanguage;
  dayIndex: number;
  day: DayPlan;
}

function StatBadge({ label, value }: { label: string; value: string }) {
  return (
    <Flex
      align="center"
      gap="0.5rem"
      bg="bg"
      borderWidth="1px"
      borderColor="border"
      px="1rem"
      py="0.5rem"
      borderRadius="20px"
      fontWeight={600}
    >
      <Text as="span" color="text2" fontSize="0.85rem">
        {label}
      </Text>
      <Text as="span" color="primary" fontFamily="mono">
        {value}
      </Text>
    </Flex>
  );
}

export default function DaySummary({ lang, dayIndex, day }: DaySummaryProps) {
  const d = DAY_NAMES[dayIndex];
  const name = lang === "en" ? d.fullEn : d.fullBn;

  return (
    <Flex
      bg="surface"
      borderWidth="1px"
      borderColor="border"
      borderRadius="12px"
      p="1.5rem"
      mb="1.5rem"
      transition="box-shadow 200ms ease"
      justify="space-between"
      align="center"
      wrap="wrap"
      gap="1rem"
      _hover={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}
    >
      <Box>
        <Heading as="h2" fontFamily="heading" fontSize="1.5rem" fontWeight={700}>
          {name}
        </Heading>
        <Text color="text2" mt="0.25rem">
          {lang === "en" ? day.workout.type.en : day.workout.type.bn}
          {" · "}
          {lang === "en" ? day.workout.duration.en : day.workout.duration.bn}
        </Text>
      </Box>
      <Flex gap="1.5rem">
        <StatBadge
          label={lang === "en" ? "Calories" : "ক্যালোরি"}
          value={String(day.diet.calories)}
        />
        <StatBadge
          label={lang === "en" ? "Protein" : "প্রোটিন"}
          value={`${day.diet.protein}g`}
        />
      </Flex>
    </Flex>
  );
}
