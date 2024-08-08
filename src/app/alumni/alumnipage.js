import React, { useState, useEffect } from 'react';
import {
  Box, Flex, Text, Button, Heading, Image, useDisclosure, Card, Spinner
} from "@chakra-ui/react";
import { getdatafromdb } from "@/lib/firebase";
import { SocialIcon } from 'react-social-icons';
import SearchBox from './searchbox';
import ModelBox from './modelbox';

const SocialIcons = ({ alumni }) => {
  const socialIconData = [
    { network: "email", url: `https://mail.google.com/mail/?view=cm&fs=1&to=${alumni.email}`, condition: true },
    { network: "whatsapp", url: `https://wa.me/${alumni.number}`, condition: alumni.phoneperm && alumni.number },
    { network: "linkedin", url: alumni.linkedIn, condition: alumni.linkedIn },
    { network: "facebook", url: alumni.facebook, condition: alumni.facebook }
  ];

  const availableIcons = socialIconData.filter(({ condition }) => condition);

  return (
    <Flex justify="center" align="center" gap={2} mt={2}>
      {availableIcons.length > 0 ? (
        availableIcons.map(({ network, url }, index) => (
          <a key={index} href={url} target="_blank" rel="noopener noreferrer">
            <SocialIcon
              network={network}
              style={{ height: 25, width: 25 }}
              as="div"
            />
          </a>
        ))
      ) : (
        <Text fontSize="sm" color="gray.500">No social links available</Text>
      )}
    </Flex>
  );
};

const AlumniCard = ({ alumni, handleMoreClick }) => (
  <Card
    width="300px"
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    boxShadow="md"
    p={2}
    textAlign="center"
  >
    <Image
      src={alumni.photoURL}
      alt={alumni.name}
      boxSize="200px"
      objectFit="cover"
      borderRadius="10px"
      mx="auto"
      fallbackSrc='./assets/usericon.webp'
      mb={4}
    />
    <Heading as="h5" size="md" mb={2}>{alumni.name}</Heading>
    <Text fontSize="sm" color="gray.500" mb={2}>Batch: {alumni.batch}</Text>
    <Text fontSize="sm" color="gray.500" mb={4}>Phone: {alumni.phoneperm && alumni.number ? alumni.number : 'Not Available'}</Text>
    <SocialIcons alumni={alumni} />
    <Button colorScheme="blue" mt={4} onClick={() => handleMoreClick(alumni)}>More</Button>
  </Card>
);

const ResultsBox = ({ filteredAlumni, handleMoreClick }) => (
  <Flex flexWrap="wrap" justifyContent="space-evenly" alignItems="center" gap={6} width="100%" mt={6}>
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

export default function AlumniList() {
  const [alumnidata, setAlumnidata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    location: '',
    nativelocation: '',
    profession: '',
    specialization: '',
  });
  const [optionsData, setOptionsData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getdatafromdb('approvedUsers');
      if (data) {
        setAlumnidata(Object.values(data));
      } else {
        console.error('Failed to fetch data');
      }
    };

    const fetchOptionsData = async () => {
      const data = await getdatafromdb('otherdata/locationdata');
      if (data) {
        setOptionsData(data);
      } else {
        console.error('Failed to fetch options data');
      }
    };

    fetchData();
    fetchOptionsData();
  }, []);

  const filteredAlumni = alumnidata
    .filter((alumni) => {
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearchTerm = searchTerm === "" ||
        (alumni.name && alumni.name.toLowerCase().includes(searchTermLower)) ||
        (alumni.batch !== undefined && alumni.batch.toString().toLowerCase().includes(searchTermLower));

      const matchesLocation = formData.location === "" || (alumni.location && alumni.location === formData.location);
      const matchesNativeLocation = formData.nativelocation === "" || (alumni.nativelocation && alumni.nativelocation === formData.nativelocation);
      const matchesProfession = formData.profession === "" || (alumni.profession && alumni.profession === formData.profession);
      const matchesSpecialization = formData.specialization === "" || (alumni.specialization && alumni.specialization === formData.specialization);

      return matchesSearchTerm && matchesLocation && matchesNativeLocation && matchesProfession && matchesSpecialization;
    })
    .sort((a, b) => {
      if (a.name && b.name) {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  const handleMoreClick = (alumni) => {
    setSelectedAlumni(alumni);
    onOpen();
  };

  return (
    <Box id="contentbox" pt={"12vh"} width={"90vw"} mx="auto">
      <SearchBox
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        formData={formData}
        setFormData={setFormData}
        optionsData={optionsData}
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
          <Spinner size="xl" mt={4} />
        </Box>
      )}
      <ModelBox isOpen={isOpen} onClose={onClose} selectedAlumni={selectedAlumni} />
    </Box>
  );
}
