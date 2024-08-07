import React, { useMemo } from 'react';
import { Box, Heading, List, ListItem, Text, HStack, VStack, Button, Divider, useToast } from "@chakra-ui/react";
import { FaShareAlt, FaCalendarAlt, FaClock, FaInfoCircle, FaLocationArrow } from 'react-icons/fa';

const EventList = React.memo(({ futureEvents }) => {
  const toast = useToast();

  const handleShare = (eventId) => {
    const url = `${window.location.origin}/calender?eventId=${eventId}`;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link copied to clipboard.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }).catch(() => {
      toast({
        title: "Failed to copy link.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    });
  };

  const eventItems = useMemo(() => futureEvents.map((event, index) => (
    <ListItem key={index} p={4} borderWidth="1px" borderRadius="md" mb={4}>
      <VStack align="start" spacing={2} w="full">
        <HStack w="full" alignItems="center">
          <Text fontSize="lg" fontWeight="bold" ml={2}>{event.title}</Text>
        </HStack>
        <Divider />
        <HStack w="full" justify="space-between">
          <HStack>
            <FaCalendarAlt color="green" />
            <Text ml={2}>{event.date}</Text>
          </HStack>
          <HStack>
            <FaClock color="purple" />
            <Text ml={2}>{event.time}</Text>
          </HStack>
        </HStack>
        <HStack w="full" justify="space-between">
          <HStack>
            <FaLocationArrow color="teal" />
            <Text ml={2}>{event.venue}</Text>
          </HStack>
          <Button onClick={() => handleShare(event.id)} colorScheme="blue" size="sm">
            <FaShareAlt />
          </Button>
        </HStack>
        <Box w="full">
        <FaInfoCircle color="blue" />
          <Text>{event.description}</Text>
        </Box>
      </VStack>
    </ListItem>
  )), [futureEvents, toast]);

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
