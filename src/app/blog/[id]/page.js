'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getpostsfromdb } from '@/lib/firebase';
import { Box, Badge, Heading, Text, Image, Link, VStack, HStack, Flex, Spinner, List, ListItem } from '@chakra-ui/react';

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        console.log('Fetching post:', id);
        const postsFromDb = await getpostsfromdb();
        const post = postsFromDb[id];
        setPost(post);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return (
      <Flex justifyContent="center" alignItems="center" h="60vh" flexDirection="column">
        <Spinner size="xl" color="blue.500" />
        <Heading mt={4} fontSize="xl" color="gray.600" textAlign="center">Loading...</Heading>
      </Flex>
    )
  }

  // Generate Table of Contents
  const generateTOC = () => {
    const toc = [];
    post.content.ops.forEach((op, idx) => {
      if (op.attributes && op.attributes.header) {
        toc.push(
          <ListItem key={idx}>
            <Link href={`#section-${idx}`} color="blue.500">
              {op.insert}
            </Link>
          </ListItem>
        );
      }
    });
    return toc;
  };

  return (
    <Box maxW="800px" mx="auto" p={5} pt="12vh">
      <Heading mb={4}>{post.title}</Heading>
      <HStack spacing={2} mb={4}>
        <Badge colorScheme="yellow">{post.authorName}</Badge>
        <Badge colorScheme="blue">{post.type}</Badge>
      </HStack>
      <VStack spacing={4} align="start">
        <List spacing={2}>
          {generateTOC()}
        </List>
        {post.content.ops.map((op, idx) => {
          if (op.insert && typeof op.insert === 'string') {
            return (
              <Text key={idx} textAlign="justify" id={`section-${idx}`}>
                {op.attributes && op.attributes.bold ? (
                  <strong>{op.insert}</strong>
                ) : (
                  op.insert
                )}
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
            return (
              <Image key={idx} src={op.insert.image} alt="Post content" mx="auto" />
            );
          }
          return null;
        })}
      </VStack>
    </Box>
  );
}
