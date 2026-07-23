import { useState, type ReactNode } from "react";
import { Box, Flex, Input, NativeSelect, Text } from "@chakra-ui/react";
import type { SupportedLanguage } from "../types/plan";
import {
  computeCalories,
  type Profile,
  type ActivityLevel,
  type Sex,
} from "../services/calories";

interface ProfileBarProps {
  lang: SupportedLanguage;
  profile: Profile;
  onLockIn: (p: Profile) => void;
}

const ACTIVITY_OPTIONS: { value: ActivityLevel; en: string; bn: string }[] = [
  { value: "sedentary", en: "Sedentary", bn: "নিষ্ক্রিয়" },
  { value: "light", en: "Lightly active", bn: "হালকা সক্রিয়" },
  { value: "moderate", en: "Moderately active", bn: "মাঝারি সক্রিয়" },
  { value: "active", en: "Very active", bn: "খুব সক্রিয়" },
  { value: "extra", en: "Extra active", bn: "অতি সক্রিয়" },
];

const fieldInputProps = {
  px: "0.5rem",
  py: "0.35rem",
  h: "auto",
  borderWidth: "1px",
  borderColor: "border",
  borderRadius: "8px",
  fontFamily: "body",
  fontSize: "0.9rem",
  color: "text",
  bg: "bg",
} as const;

const numberInputProps = {
  ...fieldInputProps,
  w: "70px",
  fontFamily: "mono",
  textAlign: "center",
} as const;

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <Text
      as="span"
      fontSize="0.72rem"
      fontWeight={600}
      color="text2"
      textTransform="uppercase"
      letterSpacing="0.03em"
    >
      {children}
    </Text>
  );
}

export default function ProfileBar({
  lang,
  profile,
  onLockIn,
}: ProfileBarProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Profile>(profile);

  const t = (en: string, bn: string) => (lang === "en" ? en : bn);
  const activityLabel = (a: ActivityLevel) => {
    const o = ACTIVITY_OPTIONS.find((x) => x.value === a);
    return o ? t(o.en, o.bn) : a;
  };

  const startEdit = () => {
    setDraft(profile);
    setEditing(true);
  };

  const lockIn = () => {
    onLockIn(draft);
    setEditing(false);
  };

  const emStyle = {
    fontStyle: "normal",
    fontSize: "0.8rem",
    color: "text2",
  } as const;

  if (!editing) {
    const summary = `${profile.heightFt}'${profile.heightIn}" · ${profile.weightKg}kg · ${profile.age} · ${profile.sex === "male" ? t("M", "পু") : t("F", "মহি")} · ${activityLabel(profile.activity)} · ${profile.location}`;
    return (
      <Flex
        maxW="1200px"
        w="100%"
        mx="auto"
        px="1.5rem"
        py="0.6rem"
        align="center"
        justify="space-between"
        gap="1rem"
        wrap="wrap"
        borderBottomWidth="1px"
        borderColor="border"
        bg="surface"
        fontSize="0.85rem"
      >
        <Text
          color="text2"
          fontWeight={500}
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          title={summary}
        >
          👤 {summary}
        </Text>
        <Box
          as="button"
          onClick={startEdit}
          px="0.75rem"
          py="0.3rem"
          fontSize="0.8rem"
          borderWidth="1px"
          borderColor="primary"
          color="primary"
          bg="surface"
          borderRadius="8px"
          fontFamily="body"
          fontWeight={500}
          cursor="pointer"
          transition="all 150ms ease"
          whiteSpace="nowrap"
          _hover={{ bg: "#eff6ff" }}
        >
          {t("Edit", "সম্পাদনা")}
        </Box>
      </Flex>
    );
  }

  const recommended = computeCalories(draft).recommended;

  return (
    <Flex
      maxW="1200px"
      w="100%"
      mx="auto"
      px="1.5rem"
      py="0.6rem"
      direction="column"
      align="stretch"
      gap="1rem"
      borderBottomWidth="1px"
      borderColor="border"
      bg="surface"
      fontSize="0.85rem"
    >
      <Flex wrap="wrap" gap="0.75rem 1.25rem" align="flex-end">
        <Flex as="label" direction="column" gap="0.25rem">
          <FieldLabel>{t("Height", "উচ্চতা")}</FieldLabel>
          <Flex as="span" display="inline-flex" align="center" gap="0.3rem">
            <Input
              type="number"
              min={3}
              max={8}
              value={draft.heightFt}
              onChange={(e) => {
                const v = e.target.valueAsNumber;
                if (!Number.isNaN(v)) setDraft({ ...draft, heightFt: v });
              }}
              {...numberInputProps}
            />
            <Text as="em" {...emStyle}>
              ft
            </Text>
            <Input
              type="number"
              min={0}
              max={11}
              value={draft.heightIn}
              onChange={(e) => {
                const v = e.target.valueAsNumber;
                if (!Number.isNaN(v)) setDraft({ ...draft, heightIn: v });
              }}
              {...numberInputProps}
            />
            <Text as="em" {...emStyle}>
              in
            </Text>
          </Flex>
        </Flex>

        <Flex as="label" direction="column" gap="0.25rem">
          <FieldLabel>{t("Weight", "ওজন")}</FieldLabel>
          <Flex as="span" display="inline-flex" align="center" gap="0.3rem">
            <Input
              type="number"
              min={30}
              max={250}
              value={draft.weightKg}
              onChange={(e) => {
                const v = e.target.valueAsNumber;
                if (!Number.isNaN(v)) setDraft({ ...draft, weightKg: v });
              }}
              {...numberInputProps}
            />
            <Text as="em" {...emStyle}>
              kg
            </Text>
          </Flex>
        </Flex>

        <Flex as="label" direction="column" gap="0.25rem">
          <FieldLabel>{t("Age", "বয়স")}</FieldLabel>
          <Input
            type="number"
            min={13}
            max={100}
            value={draft.age}
            onChange={(e) => {
              const v = e.target.valueAsNumber;
              if (!Number.isNaN(v)) setDraft({ ...draft, age: v });
            }}
            {...numberInputProps}
          />
        </Flex>

        <Flex as="label" direction="column" gap="0.25rem">
          <FieldLabel>{t("Sex", "লিঙ্গ")}</FieldLabel>
          <NativeSelect.Root size="sm">
            <NativeSelect.Field
              value={draft.sex}
              onChange={(e) =>
                setDraft({ ...draft, sex: e.target.value as Sex })
              }
              {...fieldInputProps}
            >
              <option value="male">{t("Male", "পুরুষ")}</option>
              <option value="female">{t("Female", "মহিলা")}</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Flex>

        <Flex as="label" direction="column" gap="0.25rem">
          <FieldLabel>{t("Activity", "কার্যকলাপ")}</FieldLabel>
          <NativeSelect.Root size="sm">
            <NativeSelect.Field
              value={draft.activity}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  activity: e.target.value as ActivityLevel,
                })
              }
              {...fieldInputProps}
            >
              {ACTIVITY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {t(o.en, o.bn)}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Flex>

        <Flex as="label" direction="column" gap="0.25rem" flex="1 1 200px">
          <FieldLabel>{t("Location", "অবস্থান")}</FieldLabel>
          <Input
            type="text"
            value={draft.location}
            onChange={(e) => setDraft({ ...draft, location: e.target.value })}
            {...fieldInputProps}
            w="100%"
          />
        </Flex>
      </Flex>

      <Flex align="center" justify="flex-end" gap="1rem" mt="0.75rem">
        <Text fontSize="0.85rem" color="text2">
          {t("Recommended", "প্রস্তাবিত")}:{" "}
          <Text as="strong" color="primary" fontFamily="mono">
            {recommended}
          </Text>{" "}
          {t("cal", "ক্যালোরি")}
        </Text>
        <Box
          as="button"
          onClick={lockIn}
          px="1rem"
          py="0.5rem"
          borderWidth="1px"
          borderColor="primary"
          color="primary"
          bg="surface"
          borderRadius="8px"
          fontFamily="body"
          fontSize="0.9rem"
          fontWeight={600}
          cursor="pointer"
          transition="all 150ms ease"
          _hover={{ bg: "#eff6ff" }}
        >
          {t("Lock in", "লক করুন")}
        </Box>
      </Flex>
    </Flex>
  );
}
