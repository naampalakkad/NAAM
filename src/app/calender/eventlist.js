import React, { useMemo } from 'react';
import { Box, Heading, List, ListItem, Text, HStack, VStack } from "@chakra-ui/react";

const EventList = React.memo(({ futureEvents }) => {
  const eventItems = useMemo(() => futureEvents.map((event, index) => (
    <ListItem key={index} p={4} borderWidth="1px" borderRadius="md">
      <HStack justify="space-between" align="start" w="full">
        <VStack align="start" spacing={2} flex={1}>
          <Text fontSize="lg" fontWeight="bold">
            {event.title}
          </Text>
          <Box>
            <Text fontSize="sm">
              Description
            </Text>
            <Text>{event.description}</Text>
          </Box>
        </VStack>
        <VStack align="start" spacing={2} flex={0.5}>
          <Box>
            <Text fontSize="sm">
              Date
            </Text>
            <Text>{event.date}</Text>
          </Box>
          <Box>
            <Text fontSize="sm">
              Time
            </Text>
            <Text>{event.time}</Text>
          </Box>
          <Box>
            <Text fontSize="sm">
              Venue
            </Text>
            <Text>{event.venue}</Text>
          </Box>
        </VStack>
      </HStack>
    </ListItem>
  )), [futureEvents]);

  return (
    <Box maxH="80vh" overflowY="auto" p={4} borderRadius="md" borderWidth="1px" boxShadow="md">
      <Heading textAlign="center" fontWeight="bold" mb={4}>
        Upcoming Events
      </Heading>
      <List spacing={4}>
        {eventItems}
      </List>
    </Box>
  );
});

export default EventList;
