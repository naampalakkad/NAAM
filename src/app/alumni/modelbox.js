import {
  Flex, Text, Button, Image, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Box, IconButton, Icon
} from "@chakra-ui/react";
import { MdEmail, MdPhone, MdLocationOn, MdWork, MdPerson, MdSchool, MdClose, MdLanguage } from 'react-icons/md';

const ModelBox = ({ isOpen, onClose, selectedAlumni }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="3xl">
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        <Flex align="center">
          <Icon as={MdPerson} boxSize={6} mr={2} />
          {selectedAlumni ? selectedAlumni.name : 'Alumni Name'}
        </Flex>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {selectedAlumni && (
          <>
            <Flex justifyContent="center" mb={4}>
              <Image
                src={selectedAlumni.photoURL || `/assets/usericon.webp`}
                alt={selectedAlumni.name}
                className="alumniimage"
                borderRadius="full"
                boxSize="200px"
                objectFit="cover"
              />
            </Flex>
            <Box mb={4}>
              <Text fontWeight="bold" fontSize="lg">About</Text>
              <Text>{selectedAlumni.about}</Text>
            </Box>
            <Box mb={2}>
              <Flex align="center">
                <Icon as={MdWork} boxSize={6} mr={2} />
                <Text fontWeight="bold" mr={2}>Profession:</Text>
                <Text>{selectedAlumni.profession}</Text>
              </Flex>
            </Box>
            <Box mb={2}>
              <Flex align="center">
                <Icon as={MdSchool} boxSize={6} mr={2} />
                <Text fontWeight="bold" mr={2}>Batch:</Text>
                <Text>{selectedAlumni.batch}</Text>
              </Flex>
            </Box>
            <Box mb={2}>
              <Flex align="center">
                <Icon as={MdEmail} boxSize={6} mr={2} />
                <Text fontWeight="bold" mr={2}>Email:</Text>
                <Text>{selectedAlumni.email}</Text>
              </Flex>
            </Box>
            {selectedAlumni.phoneperm && (
              <Box mb={2}>
                <Flex align="center">
                  <Icon as={MdPhone} boxSize={6} mr={2} />
                  <Text fontWeight="bold" mr={2}>Phone:</Text>
                  <Text>{selectedAlumni.number}</Text>
                </Flex>
              </Box>
            )}
            <Box mb={2}>
              <Flex align="center">
                <Icon as={MdLocationOn} boxSize={6} mr={2} />
                <Text fontWeight="bold" mr={2}>Location:</Text>
                <Text>{selectedAlumni.location}</Text>
              </Flex>
            </Box>
            <Box mb={2}>
              <Flex align="center">
                <Icon as={MdLocationOn} boxSize={6} mr={2} />
                <Text fontWeight="bold" mr={2}>Native Location:</Text>
                <Text>{selectedAlumni.nativelocation}</Text>
              </Flex>
            </Box>
            <Box mt={4}>
              <Text fontWeight="bold" mb={2}>Social Links:</Text>
              <Flex direction="row" gap={4} wrap="wrap">
                {selectedAlumni.facebook && (
                  <Button as="a" href={selectedAlumni.facebook} target="_blank" colorScheme="blue" variant="solid">
                    Facebook
                  </Button>
                )}
                {selectedAlumni.linkedIn && (
                  <Button as="a" href={selectedAlumni.linkedIn} target="_blank" colorScheme="green" variant="solid">
                    LinkedIn
                  </Button>
                )}
                {selectedAlumni.website && (
                  <Button as="a" href={selectedAlumni.website} target="_blank" leftIcon={<MdLanguage />} colorScheme="teal" variant="solid">
                    Website
                  </Button>
                )}
                {!selectedAlumni.facebook && !selectedAlumni.linkedIn && !selectedAlumni.website && (
                  <Text>No social links available</Text>
                )}
              </Flex>
            </Box>
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" leftIcon={<MdClose />} onClick={onClose}>Close</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default ModelBox;
