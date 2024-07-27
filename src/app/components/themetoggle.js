"use client";

import { HStack, Switch, useColorMode, useColorModeValue, Icon, Box } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

export const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaSun, FaMoon);
  const iconColor = useColorModeValue("yellow.500", "gray.500");

  return (
    <HStack alignItems="center" spacing={4}>
      <Icon as={SwitchIcon} color={iconColor} w={6} h={6} />
      <Box display="flex" alignItems="center">
        <Switch
          isChecked={colorMode === "dark"}
          onChange={toggleColorMode}
          size="lg"
          cursor="pointer"
          id="themeToggleButton"
          aria-label="Toggle Theme"
        />
      </Box>
    </HStack>
  );
};
