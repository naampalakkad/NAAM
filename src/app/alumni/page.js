'use client'
import React from 'react';
import { Flex } from "@chakra-ui/react";
import AlumniList from "./alumnipage";
import AuthChecker from '@/lib/loader';

export default function AlumniListPage() {
  return (
    <Flex flexDirection="column" alignItems="center">
      <AuthChecker>
        <AlumniList />
      </AuthChecker>
    </Flex>
  );
}
