"use client";

import { HStack, Switch, useColorMode, useColorModeValue, Box, useTheme } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

export const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaSun, FaMoon);
  const iconColor = useColorModeValue("yellow.500", "gray.500");
  const { colors } = useTheme();

  // Use colorMode to determine which icon to show
  const themeIcon = colorMode === "dark" 
    ? '/assets/moon.svg' 
    : "/assets/sun.svg";

  return (
    <HStack alignItems="center" spacing={4}>
      <Box position="relative">
        <Switch
          isChecked={colorMode === "dark"}
          onChange={toggleColorMode}
          size="lg"
          cursor="pointer"
          id="themeToggleButton"
          aria-label="Toggle Theme"
          colorScheme="teal"
          sx={{
            '.chakra-switch__track': {
              bg: useColorModeValue(colors.teal[600], colors.teal[600]),
              _checked: {
                bg: useColorModeValue(colors.teal[900], colors.teal[900]),
              },
            },
            '.chakra-switch__thumb': {
              '&:before': {
                content: `url(${themeIcon})`,
              },
            },
          }}
        />
      </Box>
    </HStack>
  );
};
