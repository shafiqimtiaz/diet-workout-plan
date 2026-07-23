import type { ReactNode } from "react";
import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Restaurant01Icon, Dumbbell01Icon, Clock01Icon, Target01Icon, BrainIcon } from "@hugeicons/core-free-icons";
import type { DayPlan } from "../types/plan";
import DaySelector from "./DaySelector";
import DaySummary from "./DaySummary";
import MealCard from "./MealCard";
import ExerciseCard from "./ExerciseCard";

const ICON_PROPS = { size: 18, color: "currentColor" as const, strokeWidth: 1.5 };

interface DailyPlanProps {
  activeDay: number;
  onDayChange: (day: number) => void;
  day: DayPlan;
}

function ColumnTitle({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <Heading
      as="h3"
      fontFamily="heading"
      fontSize="1.25rem"
      fontWeight={700}
      mb="1rem"
      display="flex"
      alignItems="center"
      gap="0.5rem"
    >
      {icon}
      <span>{children}</span>
    </Heading>
  );
}

export default function DailyPlan({
  activeDay,
  onDayChange,
  day,
}: DailyPlanProps) {
  return (
    <Box>
      <DaySelector activeDay={activeDay} onDayChange={onDayChange} />
      <DaySummary dayIndex={activeDay} day={day} />

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap="1.5rem">
        {/* Diet Column */}
        <Box>
          <ColumnTitle icon={<HugeiconsIcon icon={Restaurant01Icon} {...ICON_PROPS} />}>Diet Plan</ColumnTitle>
          {day.diet.meals.map((meal, i) => (
            <MealCard key={i} meal={meal} index={i} />
          ))}
        </Box>

        {/* Workout Column */}
        <Box>
          <ColumnTitle icon={<HugeiconsIcon icon={Dumbbell01Icon} {...ICON_PROPS} />}>Workout Routine</ColumnTitle>

          <Flex justify="space-between" wrap="wrap" gap="0.75rem" mb="1rem">
            <Flex
              align="center"
              gap="0.4rem"
              px="0.75rem"
              py="0.35rem"
              borderRadius="20px"
              fontSize="0.85rem"
              fontWeight={600}
              bg="bg"
              color="text"
            >
              <HugeiconsIcon icon={Clock01Icon} {...ICON_PROPS} /> {day.workout.duration}
            </Flex>
            <Flex
              align="center"
              gap="0.4rem"
              px="0.75rem"
              py="0.35rem"
              borderRadius="20px"
              fontSize="0.85rem"
              fontWeight={600}
              bg={{ _light: "#EFF6FF", _dark: "#1e3a5f" }}
              color={{ _light: "#1D4ED8", _dark: "#93c5fd" }}
            >
              <HugeiconsIcon icon={Target01Icon} {...ICON_PROPS} /> {day.workout.focus}
            </Flex>
          </Flex>

          <Box
            borderLeftWidth="3px"
            borderLeftColor="primary"
            bg={{ _light: "#eff6ff", _dark: "#0f1b33" }}
            px="1rem"
            py="0.75rem"
            borderRadius="0 8px 8px 0"
            mb="1rem"
            fontSize="0.9rem"
            color={{ _light: "#1e40af", _dark: "#93c5fd" }}
          >
            <Box fontWeight={700} mb="0.25rem">
              <HugeiconsIcon icon={BrainIcon} {...ICON_PROPS} /> Coach Tip
            </Box>
            {day.workout.tip}
          </Box>

          {day.workout.exercises.map((ex, i) => (
            <ExerciseCard key={i} exercise={ex} />
          ))}
        </Box>
      </SimpleGrid>
    </Box>
  );
}
