import {
    Flex, Text, Button, Image, Modal, ModalOverlay,
    ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    Box, Link, Icon
  } from "@chakra-ui/react";
  import { MdEmail, MdPhone, MdLocationOn, MdWork, MdPerson, MdSchool } from 'react-icons/md';
  
  const ModelBox = ({ isOpen, onClose, selectedAlumni }) => (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{selectedAlumni ? selectedAlumni.name : 'Alumni Name'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {selectedAlumni && (
            <>
              <Flex justifyContent="center">
                <Image
                  src={selectedAlumni.photoURL}
                  alt={selectedAlumni.name}
                  className="alumniimage"
                  borderRadius="full"
                  boxSize="200px"
                  objectFit="cover"
                />
              </Flex>
              <Flex direction="column" mt={4} >
                <Box  mb={2}>
                  <Text fontWeight="bold" fontSize="lg">About</Text>
                  <Text>{selectedAlumni.about}</Text>
                </Box>
                <Flex  mb={2}>
                  <Icon as={MdWork} boxSize={6} mr={2} />
                  <Text fontWeight="bold">Profession:</Text>
                  <Text ml={2}>{selectedAlumni.profession}</Text>
                </Flex>
                <Flex  mb={2}>
                  <Icon as={MdSchool} boxSize={6} mr={2} />
                  <Text fontWeight="bold">Batch:</Text>
                  <Text ml={2}>{selectedAlumni.batch}</Text>
                </Flex>
                <Flex  mb={2}>
                  <Icon as={MdEmail} boxSize={6} mr={2} />
                  <Text fontWeight="bold">Email:</Text>
                  <Text ml={2}>{selectedAlumni.email}</Text>
                </Flex>
                {selectedAlumni.phoneperm && (
                  <Flex  mb={2}>
                    <Icon as={MdPhone} boxSize={6} mr={2} />
                    <Text fontWeight="bold">Phone:</Text>
                    <Text ml={2}>{selectedAlumni.number}</Text>
                  </Flex>
                )}
                <Flex  mb={2}>
                  <Icon as={MdLocationOn} boxSize={6} mr={2} />
                  <Text fontWeight="bold">Location:</Text>
                  <Text ml={2}>{selectedAlumni.location}</Text>
                </Flex>
                <Flex  mb={2}>
                  <Icon as={MdLocationOn} boxSize={6} mr={2} />
                  <Text fontWeight="bold">Native Location:</Text>
                  <Text ml={2}>{selectedAlumni.nativelocation}</Text>
                </Flex>
                <Box mt={4}>
                  <Text fontWeight="bold">Social Links:</Text>
                  <Flex direction="column" gap={1}>
                    <Link href={`https://facebook.com/${selectedAlumni.facebook}`} isExternal color="blue.500">Facebook</Link>
                    <Link href={`https://linkedin.com/in/${selectedAlumni.linkedIn}`} isExternal color="blue.500">LinkedIn</Link>
                  </Flex>
                </Box>
              </Flex>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
  
  export default ModelBox;  