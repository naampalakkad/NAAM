import React, { useState, useEffect } from 'react';
import { Box, Flex, Input, Text, Button, Heading, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Select } from "@chakra-ui/react";
import { getdatafromdb } from "@/lib/firebase";
import { personaldetailsdata } from "@/lib/data";
import { SocialIcon } from 'react-social-icons';
import "./alumni.css";


const SearchBox = ({ searchTerm, setSearchTerm, formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleReset = () => {
    setSearchTerm("");
    setFormData({
      location: '',
      location2: '',
      profession: '',
      specialization: '',
    });
  };

  const selectFields = personaldetailsdata.filter(field => field.type === 'select');

  return (
    <Box display="flex" flexDirection="row" alignItems="center" gap={3}>
      <Input
        placeholder="Search with Name or Batch..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="filled"
        width="70%"
        padding={4}
        margin={5}
        size="lg"
      />
      {selectFields.map((field) => (
        <Select
          key={field.name}
          placeholder={field.default}
          value={formData[field.name]}
          name={field.name}
          onChange={handleChange}
          width="70%"
          margin={2}
        >
          {field.options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Select>
      ))}
      <Button 
        colorScheme="red" 
        onClick={handleReset} 
        width="30%" 
        margin={2}
      >
        Reset
      </Button>
    </Box>
  );
};


const SocialIcons = ({ alumni }) => {
  const socialIconData = [
    { network: "email", url: `https://mail.google.com/mail/?view=cm&fs=1&to=${alumni.email}` },
    { network: "whatsapp", url: `https://wa.me/${alumni.number}`, condition: alumni.phoneperm && alumni.number },
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

const AlumniCard = ({ alumni, handleMoreClick }) => (
  <Box width="300px" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" p={4} textAlign="center">
    <Image src={alumni.photo} alt={alumni.name} className="alumniimage" mx="auto" fallbackSrc='./assets/usericon.webp' />
    <Heading as="h5" size="md" mt={4} mb={2}>{alumni.name}</Heading>
    <Text fontSize="sm" color="gray.500" mb={2}>Batch: {alumni.batch}</Text>
    <Text fontSize="sm" color="gray.500" mb={2}>Phone: {alumni.phoneperm && alumni.number ? alumni.number : 'Not Available'}</Text>
    <SocialIcons alumni={alumni} />
    <Button colorScheme="blue" mt={2} onClick={() => handleMoreClick(alumni)}>More</Button>
  </Box>
);

const ResultsBox = ({ filteredAlumni, handleMoreClick }) => (
  <Flex flexWrap="wrap" justifyContent="space-evenly" alignItems="center" gap="20px" width="100%" margin="20px">
    {filteredAlumni.map((alumni, index) => (
      <AlumniCard key={index} alumni={alumni} handleMoreClick={handleMoreClick} />
    ))}
  </Flex>
);

const NoResultsBox = () => (
  <Flex justifyContent="center" alignItems="center" h="60vh">
    <Box textAlign="center">
      <Heading fontSize="4xl" color="gray.600">No results found</Heading>
      <Text fontSize="lg" mt={4} color="gray.500">Please try a different search term.</Text>
    </Box>
  </Flex>
);

const ModelBox = ({ isOpen, onClose, selectedAlumni }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{selectedAlumni ? selectedAlumni.name : 'Alumni Name'}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {selectedAlumni && (
          <>
            <Image src={selectedAlumni.photo} alt={selectedAlumni.name} className="alumniimage" />
            <Flex direction="column" mt={4}>
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

export default function AlumniList() {
  const [alumnidata, setAlumnidata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    location: '',
    location2: '',
    profession: '',
    specialization: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      // Fetch alumni data from database
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
    const matchesSearchTerm = searchTerm === "" ||
      (alumni.name && alumni.name.toLowerCase().includes(searchTermLower)) ||
      (alumni.batch !== undefined && alumni.batch.toString().toLowerCase().includes(searchTermLower));

    const matchesLocation = formData.location === "" || (alumni.location && alumni.location === formData.location);
    const matchesLocation2 = formData.location2 === "" || (alumni.location2 && alumni.location2 === formData.location2);
    const matchesProfession = formData.profession === "" || (alumni.profession && alumni.profession === formData.profession);
    const matchesSpecialization = formData.specialization === "" || (alumni.specialization && alumni.specialization === formData.specialization);

    return matchesSearchTerm && matchesLocation && matchesLocation2 && matchesProfession && matchesSpecialization;
  });

  const handleMoreClick = (alumni) => {
    setSelectedAlumni(alumni);
    onOpen();
  };

  return (
    <Box id="contentbox">
      <SearchBox
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        formData={formData}
        setFormData={setFormData}
      />
      {alumnidata.length > 0 ? (
        filteredAlumni.length > 0 ? (
          <ResultsBox filteredAlumni={filteredAlumni} handleMoreClick={handleMoreClick} />
        ) : (
          <NoResultsBox />
        )
      ) : (
        <Box textAlign="center" mt={8}>
          <Heading fontSize="xl">Loading...</Heading>
        </Box>
      )}
      <ModelBox isOpen={isOpen} onClose={onClose} selectedAlumni={selectedAlumni} />
    </Box>
  );
}
