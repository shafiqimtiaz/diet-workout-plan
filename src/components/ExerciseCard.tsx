import { Box, Flex, Text } from "@chakra-ui/react";
import type { SupportedLanguage, Exercise } from "../types/plan";

interface ExerciseCardProps {
  lang: SupportedLanguage;
  exercise: Exercise;
}

export default function ExerciseCard({ lang, exercise }: ExerciseCardProps) {
  return (
    <Flex
      bg="surface"
      borderWidth="1px"
      borderColor="border"
      borderRadius="8px"
      px="1rem"
      py="0.75rem"
      mb="0.75rem"
      justify="space-between"
      align="center"
      transition="all 150ms ease"
      animation="fade-in 200ms ease-out"
      _hover={{ borderColor: "neutral" }}
    >
      <Flex align="center" gap="0.75rem" minW={0}>
        <Flex
          align="center"
          justify="center"
          fontSize="1.5rem"
          w="2.5rem"
          h="2.5rem"
          bg="bg"
          borderRadius="50%"
          flexShrink={0}
        >
          {exercise.emoji}
        </Flex>
        <Box minW={0}>
          <Box
            fontWeight={700}
            fontSize="1rem"
            css={{ overflowWrap: "anywhere" }}
          >
            {lang === "en" ? exercise.name.en : exercise.name.bn}
          </Box>
          <Text
            fontSize="0.85rem"
            color="text2"
            css={{ overflowWrap: "anywhere" }}
          >
            {lang === "en" ? exercise.detail.en : exercise.detail.bn}
          </Text>
        </Box>
      </Flex>
      {exercise.sets && (
        <Box
          fontFamily="mono"
          bg="bg"
          px="0.5rem"
          py="0.25rem"
          borderRadius="4px"
          fontSize="0.85rem"
          fontWeight={600}
          flexShrink={0}
        >
          {exercise.sets}
        </Box>
      )}
    </Flex>
  );
}
