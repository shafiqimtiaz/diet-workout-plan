import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";

const TIPS = [
  {
    emoji: "💻",
    title: "Beat the desk",
    body:
      "Remote desk work is the real enemy. Stand and walk 5 minutes every hour (set a timer), take calls while pacing, and aim for 8,000 steps a day — the trail at Bayshore makes this easy.",
  },
  {
    emoji: "🍚",
    title: "The Bangladeshi plate hack",
    body:
      "Keep the food you love, change the ratios: half the rice, double the vegetables and dal. Cook bhuna with 1 tsp oil instead of ½ cup. At dawats, eat protein and salad first, then take one small plate of the rest — no seconds.",
  },
  {
    emoji: "🏋️",
    title: "Progressive overload",
    body:
      "Muscle only grows if the weight grows. Log every lift in a note. When you finish all sets at the top of the rep range, add 2.5 kg. Your 50 kg set will last months this way.",
  },
  {
    emoji: "🥚",
    title: "Protein protects muscle",
    body:
      "In a calorie deficit, protein is what decides whether you lose fat or muscle. Eggs, chicken, fish, dal, and Greek yogurt should appear in every meal.",
  },
  {
    emoji: "❄️",
    title: "Ottawa winter plan",
    body:
      "Cycling season is roughly April–October. From November to March, swap bike days for indoor dumbbell circuits, stair climbs, or a layered-up winter walk on the trail.",
  },
  {
    emoji: "⚖️",
    title: "Weigh in weekly, not daily",
    body:
      "Weigh yourself once a week, same day, in the morning — daily numbers bounce around and only stress you out. 76 → 65 kg by December means roughly 0.5 kg per week: steady, achievable, and no crash dieting needed.",
  },
  {
    emoji: "😴",
    title: "Sleep is a training day",
    body:
      "7–8 hours of sleep. Late-night coding sessions are where hidden snack calories live, and poor sleep spikes hunger the next day. Muscle is built in bed, not just under the barbell.",
  },
];

export default function TipsGrid() {
  return (
    <SimpleGrid minChildWidth="300px" gap="1.5rem">
      {TIPS.map((tip, i) => (
        <Box
          key={i}
          bg="surface"
          borderWidth="1px"
          borderColor="border"
          borderRadius="12px"
          p="1.5rem"
          transition="all 200ms ease"
          animation="fade-in 200ms ease-out"
          _hover={{
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            transform: "translateY(-2px)",
          }}
        >
          <Flex align="center" gap="0.75rem" mb="0.75rem">
            <Flex
              align="center"
              justify="center"
              fontSize="1.75rem"
              bg="bg"
              w="3rem"
              h="3rem"
              borderRadius="10px"
              flexShrink={0}
            >
              {tip.emoji}
            </Flex>
            <Box
              fontFamily="heading"
              fontSize="1.15rem"
              fontWeight={700}
              css={{ overflowWrap: "anywhere" }}
            >
              {tip.title}
            </Box>
          </Flex>
          <Text
            fontSize="0.95rem"
            color="text2"
            lineHeight={1.6}
            css={{ overflowWrap: "anywhere" }}
          >
            {tip.body}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
}
