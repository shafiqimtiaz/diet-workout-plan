import { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import type { SupportedLanguage } from "../types/plan";

interface RulesListProps {
  lang: SupportedLanguage;
}

const RULES = {
  en: [
    "Drink 8–10 glasses of water daily",
    "Kitchen closes at 9 PM — brush your teeth after dinner",
    "No sugary drinks — soda, juice, or sweetened cha",
    "Avoid deep-fried and ultra-processed food",
    "Hit your protein number first, every day",
    "Eat slowly — you're full before you feel it",
  ],
  bn: [
    "প্রতিদিন ৮–১০ গ্লাস পানি পান করুন",
    "রাত ৯টায় রান্নাঘর বন্ধ — রাতের খাবারের পরে দাঁত ব্রাশ করুন",
    "চিনিযুক্ত পানীয় নয় — কোলা, জুস বা মিষ্টি চা নয়",
    "ডুবো তেলে ভাজা ও প্রক্রিয়াজাত খাবার এড়িয়ে চলুন",
    "প্রতিদিন আগে প্রোটিন লক্ষ্য পূরণ করুন",
    "ধীরে ধীরে খান — পেট ভরার অনুভূতি দেরিতে আসে",
  ],
};

export default function RulesList({ lang }: RulesListProps) {
  const [checked, setChecked] = useState<boolean[]>(new Array(6).fill(false));
  const rules = lang === "en" ? RULES.en : RULES.bn;

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
        {rules.map((rule, i) => {
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
