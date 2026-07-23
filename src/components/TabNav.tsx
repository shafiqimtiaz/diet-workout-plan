import { Box, Flex } from "@chakra-ui/react";

interface TabNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { id: "daily", label: "Daily Plan" },
  { id: "rules", label: "Weekly Rules" },
  { id: "tips", label: "Health Tips" },
];

export default function TabNav({ activeTab, onTabChange }: TabNavProps) {
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
            {tab.label}
          </Box>
        );
      })}
    </Flex>
  );
}
