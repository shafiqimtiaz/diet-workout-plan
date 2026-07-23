import { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const RULES = [
  "Drink 8–10 glasses of water daily",
  "Kitchen closes at 9 PM — brush your teeth after dinner",
  "No sugary drinks — soda, juice, or sweetened cha",
  "Avoid deep-fried and ultra-processed food",
  "Hit your protein number first, every day",
  "Eat slowly — you're full before you feel it",
];

export default function RulesList() {
  const [checked, setChecked] = useState<boolean[]>(new Array(6).fill(false));

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  return (
    <Box
      bg="surface"
      borderWidth="1px"
      borderColor="border"
      borderRadius="12px"
      p="1.5rem"
      mb="1.5rem"
      transition="box-shadow 200ms ease"
      _hover={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}
    >
      <Flex direction="column" gap="1rem">
        {RULES.map((rule, i) => {
          const isChecked = checked[i];
          return (
            <Flex
              key={i}
              onClick={() => toggle(i)}
              align="center"
              gap="1rem"
              bg="surface"
              borderWidth="1px"
              borderColor="border"
              borderRadius="10px"
              p="1rem"
              cursor="pointer"
              transition="all 150ms ease"
              _hover={{ borderColor: "neutral" }}
            >
              <Flex
                align="center"
                justify="center"
                w="1.5rem"
                h="1.5rem"
                borderRadius="50%"
                borderWidth="2px"
                borderColor={isChecked ? "success" : "neutral"}
                bg={isChecked ? "success" : "transparent"}
                color="#ffffff"
                transition="all 150ms ease"
                flexShrink={0}
              >
                {isChecked ? "✓" : ""}
              </Flex>
              <Text
                fontSize="1.05rem"
                fontWeight={500}
                color={isChecked ? "text2" : "text"}
                textDecoration={isChecked ? "line-through" : "none"}
                css={{ overflowWrap: "anywhere" }}
              >
                {rule}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
}
