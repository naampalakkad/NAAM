import { Box, Heading, Text, Divider, VStack, Image, Badge, Flex, Card, CardHeader, CardBody, Stack } from '@chakra-ui/react';

const AboutPage = () => {
  const ContactInfo = () => {
    return (
      <VStack  mt={4}>
      <Badge colorScheme="teal" p={2} borderRadius="md">Email: naampalakkad@gmail.com</Badge>
      <Badge colorScheme="teal" p={2} borderRadius="md">Phone: +91 7306181024</Badge>
    </VStack>
    
    );
  };

  return (
    <Box p={8} minH="100vh">
      <div style={{ paddingTop: '10vh' }}></div>
      <VStack spacing={8} align="start">
        <Flex w="100%" justifyContent="center" alignItems="center">
          <Card shadow="md" borderWidth="1px" borderRadius="lg" w="100%" flexDirection={{ base: "column", md: "row" }} alignItems="center">
            <Image
              src="/assets/logo.webp"
              alt="Jawahar Navodaya Vidyalaya Palakkad"
              borderRadius="md"
              mb={{ base: 4, md: 0 }}
              mr={{ base: 0, md: 4 }}
              w={{ base: "50%", md: "20%" }}
              objectFit="cover"
              p={5}
            />
            <CardBody textAlign={{ base: "center", md: "left" }} p={6}>
              <Heading mb={2} color="teal.500">About NAAM</Heading>
              <Text fontSize="lg" mb={4}>
                Welcome to the official website of the Navodaya Alumni Association Palakkad (NAAM). NAAM is dedicated to fostering connections among alumni of Jawahar Navodaya Vidyalaya Palakkad, promoting camaraderie, and supporting the school and its current students.
              </Text>
            </CardBody>
          </Card>
        </Flex>

        <Divider />

        <VStack align="start" spacing={8} w="100%">
          <Card shadow="md" borderWidth="1px" borderRadius="lg" w="100%">
            <CardHeader>
              <Heading size="lg" color="teal.500">Our Mission</Heading>
            </CardHeader>
            <CardBody>
              <Text fontSize="md">
                Our mission is to strengthen the bond among alumni of Jawahar Navodaya Vidyalaya Palakkad, contribute to the educational and overall development of the school, and provide opportunities for personal growth and professional networking among our members.
              </Text>
            </CardBody>
          </Card>

          <Card shadow="md" borderWidth="1px" borderRadius="lg" w="100%">
            <CardHeader>
              <Heading size="lg" color="teal.500">Our Vision</Heading>
            </CardHeader>
            <CardBody>
              <Text fontSize="md">
                To create a vibrant community of Jawahar Navodaya Vidyalaya Palakkad alumni who are engaged, supportive, and committed to the values instilled by our alma mater. We aim to make a positive impact on society through our collective efforts.
              </Text>
            </CardBody>
          </Card>

          <Card shadow="md" borderWidth="1px" borderRadius="lg" w="100%">
            <CardHeader>
              <Heading size="lg" color="teal.500">Core Values</Heading>
            </CardHeader>
            <CardBody>
              <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                <VStack align="start">
                  <Heading size="md" >Integrity</Heading>
                  <Text fontSize="md">We uphold the highest standards of integrity and transparency in all our actions and communications.</Text>
                </VStack>
                <VStack align="start">
                  <Heading size="md" >Community</Heading>
                  <Text fontSize="md">We believe in the power of community and the strength that comes from mutual support and collaboration.</Text>
                </VStack>
                <VStack align="start">
                  <Heading size="md" >Excellence</Heading>
                  <Text fontSize="md">We strive for excellence in all our endeavors, encouraging our members to achieve their fullest potential.</Text>
                </VStack>
              </Stack>
            </CardBody>
          </Card>

          <Card shadow="md" borderWidth="1px" borderRadius="lg" w="100%">
            <CardHeader>
              <Heading size="lg" color="teal.500">History</Heading>
            </CardHeader>
            <CardBody>
              <Text fontSize="md">
                Jawahar Navodaya Vidyalaya Palakkad was established with the aim of providing quality education to talented students from rural areas. Over the years, it has grown into a hub of academic excellence and holistic development. Our alumni have gone on to achieve great success in various fields, and NAAM seeks to bring these achievers together to contribute back to the school and society.
              </Text>
            </CardBody>
          </Card>
        </VStack>
        <Card shadow="md" borderWidth="1px" borderRadius="lg" w="100%">
          <CardHeader>
            <Heading size="lg" color="teal.500">Contact Us</Heading>
          </CardHeader>
          <CardBody>
            <Text fontSize="md" mb={4}>
              If you have any questions, suggestions, or would like to get involved with NAAM, please feel free to reach out to us at:
            </Text>
            <ContactInfo />
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default AboutPage;
