import { Box, Flex } from "@chakra-ui/react";
import type { SupportedLanguage } from "../types/plan";

interface TabNavProps {
  lang: SupportedLanguage;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { id: "daily", en: "Daily Plan", bn: "দৈনিক প্ল্যান" },
  { id: "rules", en: "Weekly Rules", bn: "সাপ্তাহিক নিয়ম" },
  { id: "tips", en: "Health Tips", bn: "স্বাস্থ্য টিপস" },
];

export default function TabNav({ lang, activeTab, onTabChange }: TabNavProps) {
  return (
    <Flex
      gap="0.5rem"
      borderBottomWidth="1px"
      borderColor="border"
      mb="1.5rem"
      overflowX="auto"
      css={{ scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}
    >
      {TABS.map((tab) => {
        const active = activeTab === tab.id;
        return (
          <Box
            as="button"
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            bg="none"
            border="none"
            borderBottomWidth="2px"
            borderBottomColor={active ? "primary" : "transparent"}
            px="1rem"
            py="0.75rem"
            fontFamily="heading"
            fontWeight={600}
            fontSize="1rem"
            color={active ? "primary" : "text2"}
            cursor="pointer"
            transition="all 150ms ease"
            whiteSpace="nowrap"
            _hover={active ? undefined : { color: "text" }}
          >
            {lang === "en" ? tab.en : tab.bn}
          </Box>
        );
      })}
    </Flex>
  );
}
