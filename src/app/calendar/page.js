'use client'
import React from 'react';
import { Flex } from "@chakra-ui/react";
import Calendar from "./calenderpage";
import AuthChecker from '@/lib/loader';

export default function CalendarPage() {
  return (
    <Flex flexDirection="column" alignItems="center" w="100%" h="100vh">
      <AuthChecker>
        <Calendar />
      </AuthChecker>
    </Flex>
  );
}
