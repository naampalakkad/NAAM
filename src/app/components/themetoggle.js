// components/ThemeToggleButton.js
"use client";

import { HStack, Switch, useColorMode, useColorModeValue, Icon } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

export const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaSun,FaMoon);
  return (
    <HStack alignItems="center">
      <Switch
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
        size="lg"
        display="flex"
        alignItems="center"
      >
        <Icon as={SwitchIcon} color={colorMode === "light" ? "yellow.500" : "gray.500"} />
      </Switch>
    </HStack>
  );
};