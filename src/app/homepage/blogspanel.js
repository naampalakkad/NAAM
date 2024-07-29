'use client';
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  Image,
  CardBody,
  Stack,
  Badge,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Heading,
  HStack,
  VStack,
  Text,
  List,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import Link from 'next/link';
import { getdatafromdb } from '@/lib/firebase';

const defaultImage = "./assets/logo.webp";

export default function Blogspanel() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsFromDb = await getdatafromdb('content/approvedposts');
      if (postsFromDb) {
        const postsArray = Object.entries(postsFromDb);
        postsArray.sort((a, b) => a[1].timestamp - b[1].timestamp);
        const reversedPosts = postsArray.reverse();
        const slicedPosts = reversedPosts.slice(0, 4);
        setPosts(slicedPosts);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const openModal = (post) => {
    setSelectedPost(post);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsOpen(false);
  };

  const generateTOC = () => {
    return <Text fontWeight="bold">Table of Contents</Text>;
  };

  return (
    <Grid
      templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4} >
      {loading
        ? Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} minBlockSize={250} variant="elevated" size="sm">
              <Skeleton height="250px" />
              <CardHeader>
                <SkeletonText mt="4" noOfLines={1} spacing="4" />
              </CardHeader>
              <CardBody>
                <SkeletonText noOfLines={4} spacing="4" />
              </CardBody>
              <Stack direction="row">
                <Skeleton height="20px" width="60px" />
                <Skeleton height="20px" width="60px" />
              </Stack>
              <Button variant="solid" colorScheme="blue" m={3} isLoading>
                Read More
              </Button>
            </Card>
          ))
        : posts.map(([id, post]) => (
            <Card key={id} minBlockSize={300} variant="elevated" size="sm">
              <Image src={post.thumbnail || defaultImage} alt={post.title} height={"250px"} loading="lazy" />
              <CardHeader>{post.title}</CardHeader>
              <CardBody>{post.description}</CardBody>
              <Stack direction="row">
                <Badge colorScheme="yellow">{post.authorName}</Badge>
                <Badge colorScheme="blue">{post.type}</Badge>
              </Stack>
              <Button variant="solid" colorScheme="blue" m={3} onClick={() => openModal(post)}>
                Read More
              </Button>
            </Card>
          ))}
      <Modal isOpen={isOpen} onClose={closeModal} size="xl">
        <ModalOverlay />
        <ModalContent maxWidth="70%">
          <ModalHeader textAlign="center">
            <Heading size="lg">{selectedPost?.title}</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mx="auto" p={5}>
              <HStack spacing={2} mb={4}>
                <Badge colorScheme="yellow">{selectedPost?.authorName}</Badge>
                <Badge colorScheme="blue">{selectedPost?.type}</Badge>
              </HStack>
              <VStack spacing={4} align="start">
                <List spacing={2}>{generateTOC()}</List>
                {selectedPost?.content.ops.map((op, idx) => {
                  if (op.insert && typeof op.insert === 'string') {
                    return (
                      <Text key={idx} textAlign="justify" id={`section-${idx}`}>
                        {op.attributes && op.attributes.bold ? <strong>{op.insert}</strong> : op.insert}
                      </Text>
                    );
                  } else if (op.attributes && op.attributes.header) {
                    const HeadingComponent = `h${op.attributes.header}`;
                    return (
                      <HeadingComponent key={idx} textAlign="justify" id={`section-${idx}`}>
                        {op.insert}
                      </HeadingComponent>
                    );
                  } else if (op.attributes && op.attributes.link) {
                    return (
                      <Link key={idx} href={op.attributes.link} color="teal.500" isExternal>
                        {op.insert}
                      </Link>
                    );
                  } else if (op.insert && op.insert.image) {
                    return <Image key={idx} src={op.insert.image} alt="Post content" mx="auto" loading="lazy" />;
                  }
                  return null;
                })}
              </VStack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
  );
}
