import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Box,
  Flex,
  Icon,
  VStack,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FaCalendarAlt, FaClock, FaInfoCircle, FaLocationArrow } from 'react-icons/fa';
import { useMemo } from 'react';

const EventDetailModal = ({ showEventDetailModal, setShowEventDetailModal, selectedEvent }) => {
  const modalSize = useBreakpointValue({ base: 'full', md: 'lg' });

  const eventDetails = useMemo(() => {
    if (!selectedEvent) return {};

    const { title, extendedProps, startStr } = selectedEvent;
    const { description, time, venue } = extendedProps || {};
    const date = startStr?.split('T')[0];

    return {
      title,
      description,
      date,
      time,
      venue,
    };
  }, [selectedEvent]);

  return (
    <Modal isOpen={showEventDetailModal} onClose={() => setShowEventDetailModal(false)} size={modalSize}>
      <ModalOverlay />
      <ModalContent boxShadow="xl" borderRadius="md">
        <ModalHeader>
          <Flex alignItems="center">
            <Box flex="1" fontSize="2xl" fontWeight="bold">{eventDetails.title || 'Event Details'}</Box>
            <ModalCloseButton position="static" />
          </Flex>
        </ModalHeader>
        <ModalBody>
          <VStack spacing={4} p={4} borderRadius="md">
            {eventDetails.description && (
              <HStack width="100%" spacing={4}>
                <Icon as={FaInfoCircle} boxSize={6} color="blue.500" />
                <Text fontSize="lg">{eventDetails.description}</Text>
              </HStack>
            )}
            {eventDetails.date && (
              <HStack width="100%" spacing={4}>
                <Icon as={FaCalendarAlt} boxSize={6} color="green.500" />
                <Text fontSize="lg">
                  <strong>Date:</strong> {eventDetails.date}
                </Text>
              </HStack>
            )}
            {eventDetails.time && (
              <HStack width="100%" spacing={4}>
                <Icon as={FaClock} boxSize={6} color="purple.500" />
                <Text fontSize="lg">
                  <strong>Time:</strong> {eventDetails.time}
                </Text>
              </HStack>
            )}
            {eventDetails.venue && (
              <HStack width="100%" spacing={4}>
                <Icon as={FaLocationArrow} boxSize={6} color="purple.500" />
                <Text fontSize="lg">
                  <strong>Venue:</strong> {eventDetails.venue}
                </Text>
              </HStack>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={() => setShowEventDetailModal(false)}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventDetailModal;