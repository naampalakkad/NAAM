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
              // width:"40px",
              height:"30px",
              width:"50px",
            },
            '.chakra-switch__thumb': {
              padding: "0px",
              backgroundColor: colors.teal[50],
              width:"30px",
              height:"30px",
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
