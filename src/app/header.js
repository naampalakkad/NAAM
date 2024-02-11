'use client';

import React from 'react';
import { Box, Button, Flex, Heading , ButtonGroup} from '@chakra-ui/react';

function Header() {
  return (
    <Box as="header" bg="#3f51b5" color="white" p={2}>
      <Flex align="center" justify="space-between">
        <Button ml={4} mr={4} variant="ghost" aria-label="menu">
          ☰
        </Button>
        <Heading flexGrow={1} textAlign="center">
          NAAM
        </Heading>
        <Box direction='row' spacing={4} align='center'>
          <Button colorScheme='teal' variant='solid'>
            Button
          </Button>
          <Button colorScheme='teal' variant='outline'>
            Button
          </Button>
          <Button colorScheme='teal' variant='ghost'>
            Button
          </Button>
          <Button colorScheme='teal' variant='link'>
            Button
          </Button>
        </Box>
      </Flex>
    </Box>

  );
}


export default Header;