import { useState, type ReactNode } from "react";
import { Box, Flex, Input, NativeSelect, Text } from "@chakra-ui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserIcon } from "@hugeicons/core-free-icons";
import {
  computeCalories,
  type Profile,
  type ActivityLevel,
  type Sex,
} from "../services/calories";

interface ProfileBarProps {
  profile: Profile;
  onLockIn: (p: Profile) => void;
}

const ACTIVITY_OPTIONS: { value: ActivityLevel; label: string }[] = [
  { value: "sedentary", label: "Sedentary" },
  { value: "light", label: "Lightly active" },
  { value: "moderate", label: "Moderately active" },
  { value: "active", label: "Very active" },
  { value: "extra", label: "Extra active" },
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
  profile,
  onLockIn,
}: ProfileBarProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Profile>(profile);

  const activityLabel = (a: ActivityLevel) => {
    const o = ACTIVITY_OPTIONS.find((x) => x.value === a);
    return o ? o.label : a;
  };

  const startEdit = () => {
    setDraft(profile);
    setEditing(true);
  };

  const save = () => {
    onLockIn(draft);
    setEditing(false);
  };

  const cancel = () => {
    setDraft(profile);
    setEditing(false);
  };

  const emStyle = {
    fontStyle: "normal",
    fontSize: "0.8rem",
    color: "text2",
  } as const;

  if (!editing) {
    const summary = `${profile.heightFt}'${profile.heightIn}" · ${profile.weightKg}kg · ${profile.age} · ${profile.sex === "male" ? "M" : "F"} · ${activityLabel(profile.activity)} · ${profile.location}`;
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
          <HugeiconsIcon icon={UserIcon} size={14} color="currentColor" strokeWidth={1.5} style={{ display: "inline-block", verticalAlign: "middle", marginRight: "0.25rem" }} />
          {summary}
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
          _hover={{ bg: { _light: "#eff6ff", _dark: "#1e3a5f" } }}
        >
          Edit
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
      <Flex wrap="wrap" gap={{ base: "0.5rem 0.75rem", md: "0.75rem 1.25rem" }} align="flex-end">
        <Flex as="label" direction="column" gap="0.25rem">
          <FieldLabel>Height</FieldLabel>
          <Flex as="span" display="inline-flex" align="center" gap="0.3rem">
            <Input
              type="text"
              inputMode="numeric"
              value={draft.heightFt}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                if (raw === "") return;
                setDraft({ ...draft, heightFt: Math.max(3, Math.min(8, Number(raw))) });
              }}
              {...numberInputProps}
            />
            <Text as="em" {...emStyle}>
              ft
            </Text>
            <Input
              type="text"
              inputMode="numeric"
              value={draft.heightIn}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                if (raw === "") return;
                setDraft({ ...draft, heightIn: Math.max(0, Math.min(11, Number(raw))) });
              }}
              {...numberInputProps}
            />
            <Text as="em" {...emStyle}>
              in
            </Text>
          </Flex>
        </Flex>

        <Flex as="label" direction="column" gap="0.25rem">
          <FieldLabel>Weight</FieldLabel>
          <Flex as="span" display="inline-flex" align="center" gap="0.3rem">
            <Input
              type="text"
              inputMode="numeric"
              value={draft.weightKg}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                if (raw === "") return;
                setDraft({ ...draft, weightKg: Math.max(30, Math.min(250, Number(raw))) });
              }}
              {...numberInputProps}
            />
            <Text as="em" {...emStyle}>
              kg
            </Text>
          </Flex>
        </Flex>

        <Flex as="label" direction="column" gap="0.25rem">
          <FieldLabel>Age</FieldLabel>
            <Input
              type="text"
              inputMode="numeric"
              value={draft.age}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                if (raw === "") return;
                setDraft({ ...draft, age: Math.max(13, Math.min(100, Number(raw))) });
              }}
              {...numberInputProps}
            />
        </Flex>

        <Flex as="label" direction="column" gap="0.25rem">
          <FieldLabel>Sex</FieldLabel>
          <NativeSelect.Root size="sm">
            <NativeSelect.Field
              value={draft.sex}
              onChange={(e) =>
                setDraft({ ...draft, sex: e.target.value as Sex })
              }
              {...fieldInputProps}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Flex>

        <Flex as="label" direction="column" gap="0.25rem">
          <FieldLabel>Activity</FieldLabel>
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
                  {o.label}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Flex>

        <Flex as="label" direction="column" gap="0.25rem" flex="1 1 200px">
          <FieldLabel>Location</FieldLabel>
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
          Recommended:{" "}
          <Text as="strong" color="primary" fontFamily="mono">
            {recommended}
          </Text>{" "}
          cal
        </Text>
        <Box
          as="button"
          onClick={cancel}
          px="1rem"
          py="0.5rem"
          borderWidth="1px"
          borderColor="border"
          color="text2"
          bg="surface"
          borderRadius="8px"
          fontFamily="body"
          fontSize="0.9rem"
          fontWeight={500}
          cursor="pointer"
          transition="all 150ms ease"
          _hover={{ borderColor: "neutral", color: "text" }}
        >
          Cancel
        </Box>
        <Box
          as="button"
          onClick={save}
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
          _hover={{ bg: { _light: "#eff6ff", _dark: "#1e3a5f" } }}
        >
          Save
        </Box>
      </Flex>
    </Flex>
  );
}
