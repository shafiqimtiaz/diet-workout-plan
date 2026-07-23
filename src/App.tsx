import { useState, useCallback } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useGeminiPlan } from "./hooks/useGeminiPlan";
import type { SupportedLanguage } from "./types/plan";
import Header from "./components/Header";
import ProfileBar from "./components/ProfileBar";
import TabNav from "./components/TabNav";
import DailyPlan from "./components/DailyPlan";
import RulesList from "./components/RulesList";
import TipsGrid from "./components/TipsGrid";

export default function App() {
  const [lang, setLang] = useState<SupportedLanguage>("en");
  const [activeTab, setActiveTab] = useState("daily");
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

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "en" ? "bn" : "en"));
  }, []);

  const day = plan.days[activeDay] ?? plan.days[0];

  return (
    <Flex direction="column" minH="100vh">
      <Header
        lang={lang}
        onToggleLang={toggleLang}
        calories={calories}
        onCaloriesChange={setCalories}
        onGenerate={generate}
        min={range.min}
        max={range.max}
        dirty={dirty}
        loading={loading}
      />

      <ProfileBar lang={lang} profile={profile} onLockIn={setProfile} />

      <Box as="main" w="100%" maxW="1200px" mx="auto" p={{ base: "1rem", md: "1.5rem" }}>
        <TabNav lang={lang} activeTab={activeTab} onTabChange={setActiveTab} />

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

        {activeTab === "daily" && day && (
          <Box animation="fade-in 200ms ease-out">
            <DailyPlan
              lang={lang}
              activeDay={activeDay}
              onDayChange={setActiveDay}
              day={day}
            />
          </Box>
        )}

        {activeTab === "rules" && (
          <Box animation="fade-in 200ms ease-out">
            <RulesList lang={lang} />
          </Box>
        )}

        {activeTab === "tips" && (
          <Box animation="fade-in 200ms ease-out">
            <TipsGrid lang={lang} />
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
            {lang === "en"
              ? "Personal health companion. Honoring healthy lifestyle guidelines daily."
              : "ব্যক্তিগত স্বাস্থ্য সহচর। প্রতিদিন স্বাস্থ্যকর জীবনধারা নির্দেশিকা সম্মানিত করা।"}
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}
