'use client'
import React from 'react';
import { Flex } from "@chakra-ui/react";
import GalleryPage from './gallerypage';
import AuthChecker from '@/lib/loader';

export default function GalleryListPage() {
  return (
    <Flex flexDirection="column" alignItems="center" w="100%">
      <AuthChecker>
        <GalleryPage />
      </AuthChecker>
    </Flex>
  );
}
