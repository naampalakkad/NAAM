import React from 'react';
import { Box, Heading, List, ListItem, Text, HStack, VStack } from "@chakra-ui/react";

const EventList = React.memo(({ futureEvents }) => {
  return (
    <Box>
      <Heading textAlign="center" fontWeight="bold" mb={4}>
        Upcoming Events
      </Heading>
      <List spacing={4} justifyContent={"center"}>
        {futureEvents.map((event, index) => (
          <ListItem key={index} p={4} borderWidth="1px" borderRadius="md">
            <HStack justify="space-between" align="start">
              <VStack align="start" spacing={2} flex={1}>
                <Text fontSize="lg" fontWeight="bold">
                  {event.title}
                </Text>
                <Box>
                  <Text fontSize="sm" color="gray.500">
                    Description
                  </Text>
                  <Text>{event.description}</Text>
                </Box>
              </VStack>
              <VStack align="start" spacing={2} flex={0.5}>
                <Box>
                  <Text fontSize="sm" color="gray.500">
                    Date
                  </Text>
                  <Text>{event.date}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.500">
                    Time
                  </Text>
                  <Text>{event.time}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.500">
                    Venue
                  </Text>
                  <Text>{event.venue}</Text>
                </Box>
              </VStack>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
});

export default EventList;
