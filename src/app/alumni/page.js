'use client'
import React, { useState, useEffect } from 'react'
import { Box, Flex, Input, Text, InputLeftElement, InputGroup, Button, Heading, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import { getdatafromdb } from "@/lib/firebase"
import { SocialIcon } from 'react-social-icons/component'
import { IconButton } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import "./alumni.css"
import 'react-social-icons/linkedin'
import 'react-social-icons/facebook'
import 'react-social-icons/whatsapp'
import 'react-social-icons/email'

const SearchBox = ({ searchTerm, setSearchTerm }) => {
  return (
    <Input
        placeholder="Search with Name or batch..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant={"filled"}
        width="70%"
        padding={4}
        margin={5}
        size={"lg"}
      />
    
  );
};

const SocialIcons = ({ alumni }) => {
  const socialIconData = [
    { network: "email", url: `https://mail.google.com/mail/?view=cm&fs=1&to=${alumni.email}` },
    { network: "whatsapp", url: `https://wa.me/${alumni.number}`, condition: alumni.phoneperm && alumni.phoneperm === true && alumni.number },
    { network: "linkedin", url: `https://www.linkedin.com/in/${alumni.linkedIn}`, condition: alumni.linkedIn },
    { network: "facebook", url: `https://www.facebook.com/${alumni.facebook}`, condition: alumni.facebook }
  ];

  return (
    <Flex justify="center" align="center" gap='2'>
      {socialIconData.map(({ network, url, condition }, index) => (
        condition && (
          <a key={index} href={url} target="_blank" rel="noopener noreferrer">
            <SocialIcon
              padding={10}
              network={network}
              style={{ height: 25, width: 25 }}
              href={url}
              as="div"
            />
          </a>
        )
      ))}
    </Flex>
  );
};

const ResultsBox = ({ filteredAlumni, handleMoreClick }) => {

  return (
    <Flex
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="space-evenly"
      alignItems="center"
      gap="20px"
      width="100%"
      margin={"20px"}
    >
      {filteredAlumni.map((alumni, index) => (
        <AlumniCard key={index} alumni={alumni} handleMoreClick={handleMoreClick} />
      ))}
    </Flex>
  );
};

const AlumniCard = ({ alumni, handleMoreClick }) => {
  return (
    <Box width="300px" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" p={4} textAlign="center">
      <Image src={alumni.photo} alt={alumni.name} className="alumniimage" mx="auto" />
      <Heading as="h5" size="md" mt={4} mb={2}>
        {alumni.name}
      </Heading>
      <Text fontSize="sm" color="gray.500" mb={2}>
        Batch: {alumni.batch}
      </Text>
      <Text fontSize="sm" color="gray.500" mb={2}>
        Phone: {alumni.phoneperm && alumni.phoneperm === true && alumni.number ? alumni.number : 'Not Available'}
      </Text>
      <SocialIcons alumni={alumni} />
      <Button colorScheme="blue" mt={2} onClick={() => handleMoreClick(alumni)}>
        More
      </Button>
    </Box>
  );
};

const NoResultsBox = () => {
  return (
    <Flex justifyContent="center" alignItems="center" h="60vh">
      <Box textAlign="center">
        <Heading fontSize="4xl" color="gray.600">No results found</Heading>
        <Text fontSize="lg" mt={4} color="gray.500">Please try a different search term.</Text>
      </Box>
    </Flex>
  );
};

const ModelBox = ({ isOpen, onClose, selectedAlumni }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{selectedAlumni ? selectedAlumni.name : 'Alumni Name'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {selectedAlumni && (
            <>
              <Image src={selectedAlumni.photo} alt={selectedAlumni.name} className="alumniimage" />
              <Flex direction="column">
                <Text fontWeight="bold">About:</Text>
                <Text>{selectedAlumni.about}</Text>
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
};

export default function alumnilist() {
  const [alumnidata, setAlumnidata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getdatafromdb('users');
      if (data) {
        setAlumnidata(Object.values(data));
      } else {
        console.error('Failed to fetch data');
      }
    };
    fetchData();
  }, []);

  const filteredAlumni = alumnidata.filter((alumni) => {
    const searchTermLower = searchTerm.toLowerCase();
    return searchTerm === "" ||
      alumni.name.toLowerCase().includes(searchTermLower) ||
      alumni.batch.toLowerCase().includes(searchTermLower);
  });

  const handleMoreClick = (alumni) => {
    setSelectedAlumni(alumni);
    onOpen();
  }

  return (
    <Box id="contentbox">
      <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {filteredAlumni.length > 0 ? (
        <ResultsBox filteredAlumni={filteredAlumni} handleMoreClick={handleMoreClick} />
      ) : (
        <NoResultsBox />
      )}
      <ModelBox isOpen={isOpen} onClose={onClose} selectedAlumni={selectedAlumni} />
    </Box>
  );
}