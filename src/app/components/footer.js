'use client';
import { Box, Flex, Text, Image, Stack, IconButton, useColorModeValue } from '@chakra-ui/react';
import { SocialIcon } from 'react-social-icons';
import { FooterMenuItems, socialMediaUrls } from '@/lib/data';
import { ChevronRightIcon } from '@chakra-ui/icons';

const MenuItem = ({ item }) => (
  <a href={item.link}>
    <Text fontSize="md" color="white" p={0.3} _hover={{ textDecoration: 'underline' }}>
      {item.name}
    </Text>
  </a>
);

const Socials = () => (
  <Flex spacing={1} width={{ base: 'full', md: '30%' }}justifyContent={"space-evenly"} alignContent={"center"}>
    {socialMediaUrls.map((url) => (
      <IconButton
        m={3}
        key={url}
        as={SocialIcon}
        url={url}
        aria-label="Social media icon"
        size="lg"
        borderRadius={"full"}
        colorScheme="teal"
        _hover={{ filter: 'brightness(115%)' }}
      />
    ))}
  </Flex>
);

const Footer = () => {
  const footerBg = useColorModeValue('rgb(0, 19, 59)', 'rgb(0, 19, 59)');
  const textColor = useColorModeValue('white', 'white');
  const copyrightColor = useColorModeValue('rgb(185, 185, 185)', 'rgb(185, 185, 185)');
  const hoverColor = useColorModeValue('rgb(211, 168, 168)', 'rgb(211, 168, 168)');

  return (
    <Box bg={footerBg} color={textColor} >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="center"
      >
        <Flex direction="row" align="center" width={{ base: 'full', md: '30%' }}>
          <Image
            src={`/assets/logo.webp`}
            alt="Main logo"
            boxSize={{ base: '100px', md: '100px' }}
            borderRadius={"full"}
            m={5}
            onClick={() => window.location.href = '/'}
            cursor="pointer"
          />
          <Stack spacing={1} ml={4}>
            <Text fontSize={{ base: 'lg', md: '2xl' }}>NAAM</Text>
            <Text fontSize={{ base: 'sm', md: 'md' }}>Navodaya Alumni Association</Text>
            <Text fontSize={{ base: 'sm', md: 'md' }}>Malampuzha, Palakkad, Kerala, India</Text>
          </Stack>
        </Flex>
        <Flex direction={{ base: 'column', md: 'row' }} align="center" justifyContent={"space-evenly"} width={{ base: 'full', md: '30%' }}>
          {FooterMenuItems.map(item => (
            <MenuItem key={item.name} item={item} />
          ))}
        </Flex>
        <Socials />
      </Flex>
      <Box textAlign="center" bg="rgb(0, 7, 22)" py={2} color={copyrightColor}>
        <Text
          fontSize="sm"
          _hover={{ color: hoverColor }}
        >
          copyright@2024
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
