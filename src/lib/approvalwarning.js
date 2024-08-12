import React from 'react';
import { Box, Text, Icon } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';

const AdminApprovalWarning = () => {
  return (
    <Box
      bg="yellow.100"
      border="1px"
      borderColor="yellow.300"
      borderRadius="md"
      p={4}
      display="flex"
      alignItems="center"
      maxW="md"
      mx="auto"
      mt={6}
    >
      <Icon as={WarningIcon} boxSize={6} color="yellow.500" mr={3} />
      <Text color="gray.700">
        Subject to admin approval. Contact your Batch Representative if not approved. Others can only see once it is approved by admin.
      </Text>
    </Box>
  );
};

export default AdminApprovalWarning;
