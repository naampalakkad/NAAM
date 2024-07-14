import { Box, Heading, Text, Divider, VStack, Image, HStack, Flex } from '@chakra-ui/react';

const AboutPage = () => {
  const ContactInfo = () => {
    return (
      <HStack spacing={4} mt={4}>
        <HStack spacing={2}>
          <Text>Email: sreejithksgupta2255@gmail.com</Text>
        </HStack>
        <HStack spacing={2}>
          <Text>Phone: 9846370188</Text>
        </HStack>
      </HStack>
    );
  };

  return (
    <Box p={8} minH="100vh">
      <div style={{ paddingTop: '10vh' }}></div>
      <VStack spacing={8} align="start">
        <Flex w="100%" justifyContent="center" alignItems="center">
          <Box
            textAlign="center"
            p={6}
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
            w="100%"
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            alignItems="center">

            <Image
              src="/assets/logo.webp"
              alt="Jawahar Navodaya Vidyalaya Palakkad"
              borderRadius="md"
              mb={{ base: 4, md: 0 }}
              mr={{ base: 0, md: 4 }}
              w={{ base: "50%", md: "20%" }}
              objectFit="cover"
            />

            <Box textAlign={{ base: "center", md: "left" }} p={6}>
              <Heading mb={2} color="teal.500">About NAAM</Heading>
              <Text fontSize="lg" mb={4}>
                Welcome to the official website of the Navodaya Alumni Association Palakkad (NAAM). NAAM is dedicated to fostering connections among alumni of Jawahar Navodaya Vidyalaya Palakkad, promoting camaraderie, and supporting the school and its current students.
              </Text>
            </Box>

          </Box>
        </Flex>


        <Divider />

        <VStack align="start" spacing={8} w="100%">
          <Box
            p={6}
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
            w="100%"
          >
            <Heading size="lg" color="teal.500">Our Mission</Heading>
            <Text fontSize="md" mt={4}>
              Our mission is to strengthen the bond among alumni of Jawahar Navodaya Vidyalaya Palakkad, contribute to the educational and overall development of the school, and provide opportunities for personal growth and professional networking among our members.
            </Text>
          </Box>

          <Box
            p={6}
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
            w="100%"
          >
            <Heading size="lg" color="teal.500">Our Vision</Heading>
            <Text fontSize="md" mt={4}>
              To create a vibrant community of Jawahar Navodaya Vidyalaya Palakkad alumni who are engaged, supportive, and committed to the values instilled by our alma mater. We aim to make a positive impact on society through our collective efforts.
            </Text>
          </Box>

          <Box
            p={6}
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
            w="100%"
          >
            <Heading size="lg" color="teal.500">Core Values</Heading>
            <HStack spacing={8} mt={4}>
              <VStack align="start">
                <Heading size="md" color="gray.700">Integrity</Heading>
                <Text fontSize="md">We uphold the highest standards of integrity and transparency in all our actions and communications.</Text>
              </VStack>
              <VStack align="start">
                <Heading size="md" color="gray.700">Community</Heading>
                <Text fontSize="md">We believe in the power of community and the strength that comes from mutual support and collaboration.</Text>
              </VStack>
              <VStack align="start">
                <Heading size="md" color="gray.700">Excellence</Heading>
                <Text fontSize="md">We strive for excellence in all our endeavors, encouraging our members to achieve their fullest potential.</Text>
              </VStack>
            </HStack>
          </Box>

          <Box
            p={6}
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
            w="100%"
          >
            <Heading size="lg" color="teal.500">History</Heading>
            <Text fontSize="md" mt={4}>
              Jawahar Navodaya Vidyalaya Palakkad was established with the aim of providing quality education to talented students from rural areas. Over the years, it has grown into a hub of academic excellence and holistic development. Our alumni have gone on to achieve great success in various fields, and NAAM seeks to bring these achievers together to contribute back to the school and society.
            </Text>
          </Box>


        </VStack>
      </VStack>


      <Box
        p={6}
        shadow="md"
        borderWidth="1px"
        borderRadius="lg"
        w="100%"
      >
        <Heading size="lg" color="teal.500">Contact Us</Heading>
        <Text fontSize="md" mt={4}>
          If you have any questions, suggestions, or would like to get involved with NAAM, please feel free to reach out to us at .
        </Text>
        <ContactInfo />
      </Box>
    </Box>
  );
};

export default AboutPage;