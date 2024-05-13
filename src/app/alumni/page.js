'use client'
import React, { useState, useEffect } from 'react'
import { Box, Flex, Input, Text, CardFooter, Button, Heading, SimpleGrid, Card, Image, Stack, Divider, Spacer, Center, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import { getdatafromdb } from "@/lib/firebase"
import { SocialIcon } from 'react-social-icons/component'
import "./alumni.css"
import 'react-social-icons/linkedin'
import 'react-social-icons/facebook'
import 'react-social-icons/whatsapp'
import 'react-social-icons/email'

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
    <Box id="contentbox" >
      <Input
        id="search_bar"
        type="text"
        variant="filled"
        placeholder="Search with Name or batch..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        width="70%"
        padding={1}
        margin={5}
      />
      <Box width={"100%"} padding={1}>
        {filteredAlumni.length > 0 ? (
          <SimpleGrid minChildWidth="200px" gridAutoColumns="200px" spacing="10px">
            {filteredAlumni.map((alumni, index) => (
              <Card key={index} direction={"column"} align={"center"} margin={3} padding={1} overflow='hidden' variant='filled'>
                <Image src={alumni.photo} alt={alumni.name} className="alumniimage" />
                <Heading align={"Center"} as={"h5"} size={"md"} margin={1}>
                  {alumni.name}
                </Heading >
                <Spacer />
                <Flex direction={"column"} width={"90%"} align={"left"} padding={2} >
                  <Text >
                    <span className="detailName">Batch: </span>
                    <span className="detailValue">{alumni.batch}</span>
                  </Text>
                  {alumni.phoneperm && alumni.phoneperm === true && alumni.number ? (
                    <Text>
                      <span className="detailName">Phone: </span>
                      <span className="detailValue">{alumni.number}</span>
                    </Text>
                  ) : (
                    <Text>
                      <span className="detailName">Phone: </span>
                      <span className="detailValue">Not Available</span>
                    </Text>
                  )}

                </Flex>
                <Spacer />
                <Flex justify="space-evenly" align="center" gap='2'>
                  {alumni.email && (
                    <SocialIcon
                      padding={10}
                      network="email"
                      style={{ height: 25, width: 25 }}
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${alumni.email}`} />
                  )}
                  {alumni.phoneperm && alumni.phoneperm === true && alumni.number && (
                    <SocialIcon
                      padding={10}
                      network="whatsapp"
                      style={{ height: 25, width: 25 }}
                      href={`https://wa.me/${alumni.number}`}
                    />
                  )}
                  {alumni.linkedIn && (
                    <SocialIcon
                      padding={10}
                      network="linkedin"
                      style={{ height: 25, width: 25 }}
                      href={`https://www.linkedin.com/in/${alumni.linkedIn}`}
                    />
                  )}
                  {alumni.facebook && (
                    <SocialIcon
                      padding={10}
                      network="facebook"
                      style={{ height: 25, width: 25 }}
                      href={`https://www.facebook.com/${alumni.facebook}`}
                    />
                  )}
                  <Spacer />
                </Flex>

                <Spacer />
                <CardFooter padding={1}>
                  <Button colorScheme='blue' onClick={() => handleMoreClick(alumni)}>More</Button>
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          <Text mt={4} textAlign="center">
            No results found.
          </Text>
        )}
      </Box>
      {selectedAlumni && (
        <div>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedAlumni.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Image src={selectedAlumni.photo} alt={selectedAlumni.name} className="alumniimage" />
                <Flex direction="column">
                  <Text fontWeight="bold">About:</Text>
                  <Text>{selectedAlumni.about}</Text>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

        </div>
      )}
    </Box>
  );
}