import type { ReactNode } from "react";
import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import type { DayPlan } from "../types/plan";
import DaySelector from "./DaySelector";
import DaySummary from "./DaySummary";
import MealCard from "./MealCard";
import ExerciseCard from "./ExerciseCard";

function Icon({ children, ...props }: { children: React.ReactNode; width?: string; height?: string }) {
  return (
    <svg
      width={props.width ?? "18"}
      height={props.height ?? "18"}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      {children}
    </svg>
  );
}

function PlateIcon() {
  return (
    <Icon>
      <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0" />
      <path d="M12 3v18" />
      <path d="M3 12h18" />
    </Icon>
  );
}

function MuscleIcon() {
  return (
    <Icon>
      <path d="M6.5 6.5 3 10l3.5 3.5" />
      <path d="M17.5 6.5 21 10l-3.5 3.5" />
      <path d="M12 2C8 2 6 5 6 8c0 3 2 5 2 8 0 1.5 1.5 3 4 3s4-1.5 4-3c0-3 2-5 2-8 0-3-2-6-6-6z" />
    </Icon>
  );
}

function ClockIcon() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 15" />
    </Icon>
  );
}

function TargetIcon() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" />
    </Icon>
  );
}

function BrainIcon() {
  return (
    <Icon>
      <path d="M12 4a4 4 0 0 1 3.5 2.1A4 4 0 0 1 20 9.5c0 1.5-.8 2.8-2 3.5v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1a4.5 4.5 0 0 1 2.5-8.2A4 4 0 0 1 12 4z" />
      <path d="M12 17v4" />
    </Icon>
  );
}

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
          <ColumnTitle icon={<PlateIcon />}>Diet Plan</ColumnTitle>
          {day.diet.meals.map((meal, i) => (
            <MealCard key={i} meal={meal} index={i} />
          ))}
        </Box>

        {/* Workout Column */}
        <Box>
          <ColumnTitle icon={<MuscleIcon />}>Workout Routine</ColumnTitle>

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
              <ClockIcon /> {day.workout.duration}
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
              <TargetIcon /> {day.workout.focus}
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
              <BrainIcon /> Coach Tip
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
