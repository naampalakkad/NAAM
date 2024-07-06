import React, { useState, useEffect } from 'react';
import {
  Box, Flex,  Text, Button, Heading, Image,  useDisclosure
} from "@chakra-ui/react";
import { getdatafromdb } from "@/lib/firebase";
import { SocialIcon } from 'react-social-icons';
import SearchBox from './searchbox';
import ModelBox from './modelbox';
import "./alumni.css";



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
    <Image src={alumni.photoURL} alt={alumni.name} className="alumniimage" mx="auto" fallbackSrc='./assets/usericon.webp' />
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
      const data = await getdatafromdb('users');
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

  const filteredAlumni = alumnidata.filter((alumni) => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearchTerm = searchTerm === "" ||
      (alumni.name && alumni.name.toLowerCase().includes(searchTermLower)) ||
      (alumni.batch !== undefined && alumni.batch.toString().toLowerCase().includes(searchTermLower));

    const matchesLocation = formData.location === "" || (alumni.location && alumni.location === formData.location);
    const matchesnativelocation = formData.nativelocation === "" || (alumni.nativelocation && alumni.nativelocation === formData.nativelocation);
    const matchesProfession = formData.profession === "" || (alumni.profession && alumni.profession === formData.profession);
    const matchesSpecialization = formData.specialization === "" || (alumni.specialization && alumni.specialization === formData.specialization);

    return matchesSearchTerm && matchesLocation && matchesnativelocation && matchesProfession && matchesSpecialization;
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
        </Box>
      )}
      <ModelBox isOpen={isOpen} onClose={onClose} selectedAlumni={selectedAlumni} />
    </Box>
  );
}
