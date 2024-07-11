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
  HStack
} from '@chakra-ui/react';
import { FaCalendarAlt, FaClock, FaInfoCircle, FaLocationArrow } from 'react-icons/fa';

const EventDetailModal = ({ showEventDetailModal, setShowEventDetailModal, selectedEvent }) => {
  return (
    <Modal isOpen={showEventDetailModal} onClose={() => setShowEventDetailModal(false)} size="lg">
      <ModalOverlay />
      <ModalContent boxShadow="xl" borderRadius="md">
        <ModalHeader>
          <Flex alignItems="center">
            <Box flex="1" fontSize="2xl" fontWeight="bold">{selectedEvent.title}</Box>
            <ModalCloseButton position="static" />
          </Flex>
        </ModalHeader>
        <ModalBody>
          <VStack spacing={4} p={4} borderRadius="md">
            <HStack width="100%" spacing={4}>
              <Icon as={FaInfoCircle} boxSize={6} color="blue.500" />
              <Text fontSize="lg">
                {selectedEvent.extendedProps.description}
              </Text>
            </HStack>
            <HStack width="100%" spacing={4}>
              <Icon as={FaCalendarAlt} boxSize={6} color="green.500" />
              <Text fontSize="lg">
                <strong>Date:</strong> {selectedEvent.startStr.split('T')[0]}
              </Text>
            </HStack>
            <HStack width="100%" spacing={4}>
              <Icon as={FaClock} boxSize={6} color="purple.500" />
              <Text fontSize="lg">
                <strong>Time:</strong> {selectedEvent.extendedProps.time}
              </Text>
            </HStack>
            <HStack width="100%" spacing={4}>
              <Icon as={FaLocationArrow} boxSize={6} color="purple.500" />
              <Text fontSize="lg">
                <strong>Venue:</strong> {selectedEvent.extendedProps.venue}
              </Text>
            </HStack>
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
