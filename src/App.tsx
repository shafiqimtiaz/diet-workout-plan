import { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useGeminiPlan } from "./hooks/useGeminiPlan";
import Header from "./components/Header";
import ProfileBar from "./components/ProfileBar";
import DailyPlan from "./components/DailyPlan";

export default function App() {
  const [activeDay, setActiveDay] = useState(new Date().getDay());

  const {
    profile,
    setProfile,
    calories,
    setCalories,
    range,
    generate,
    dirty,
    plan,
    loading,
    error,
    usingFallback,
  } = useGeminiPlan();

  const day = plan.days[activeDay] ?? plan.days[0];

  return (
    <Flex direction="column" minH="100vh">
      <Header
        calories={calories}
        onCaloriesChange={setCalories}
        onGenerate={generate}
        min={range.min}
        dirty={dirty}
        loading={loading}
      />

      <ProfileBar profile={profile} onLockIn={setProfile} />

      <Box as="main" w="100%" maxW="1200px" mx="auto" p={{ base: "1rem", md: "1.5rem" }}>
        {usingFallback && error && (
          <Flex
            align="center"
            gap="0.5rem"
            bg="#fef3c7"
            borderWidth="1px"
            borderColor="#f59e0b"
            color="#92400e"
            px="1rem"
            py="0.75rem"
            borderRadius="8px"
            mb="1rem"
            fontSize="0.9rem"
          >
            <span>⚠️</span> {error}
          </Flex>
        )}

        {day && (
          <Box animation="fade-in 200ms ease-out">
            <DailyPlan
              activeDay={activeDay}
              onDayChange={setActiveDay}
              day={day}
            />
          </Box>
        )}
      </Box>

      <Box
        as="footer"
        mt="auto"
        textAlign="center"
        py="2rem"
        color="text2"
        borderTopWidth="1px"
        borderColor="border"
        fontSize="0.9rem"
      >
        <Box w="100%" maxW="1200px" mx="auto" px="1.5rem">
          <Text>
            Personal health companion. Honoring healthy lifestyle guidelines daily.
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}
