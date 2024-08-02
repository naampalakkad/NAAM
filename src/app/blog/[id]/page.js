'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { auth, getdatafromdb } from '@/lib/firebase';
import { Box, Badge, Heading, Text, VStack, HStack, Image, Flex, Spinner, Button, List, ListItem, useToast } from '@chakra-ui/react';
import CommentSection from './CommentSection';
import LatestPostsPanel from './LatestPostsPanel';

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);
  const [nextPostId, setNextPostId] = useState(null);
  const [previousPostId, setPreviousPostId] = useState(null);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        console.log('Fetching post:', id);
        const post = await getdatafromdb(`content/approvedposts/${id}`);
        setPost(post);

        // Fetch adjacent posts
        const allPosts = await getdatafromdb('content/approvedposts');
        const postIds = Object.keys(allPosts).sort((a, b) => allPosts[b].timestamp - allPosts[a].timestamp);
        const currentIndex = postIds.indexOf(id);

        setNextPostId(postIds[currentIndex - 1] || null);
        setPreviousPostId(postIds[currentIndex + 1] || null);
        setLoadingPost(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleNavigation = (postId) => {
    if (postId) {
      router.push(`/blog/${postId}`);
    }
  };

  if (loadingPost) {
    return (
      <Flex justifyContent="center" alignItems="center" h="60vh" flexDirection="column">
        <Spinner size="xl" color="blue.500" />
        <Heading mt={4} fontSize="xl" color="gray.600" textAlign="center">Loading...</Heading>
      </Flex>
    );
  }

  // Generate Table of Contents
  const generateTOC = () => {
    const toc = [];
    post.content.ops.forEach((op, idx) => {
      if (op.attributes && op.attributes.header) {
        toc.push(
          <ListItem key={idx}>
            <a href={`#section-${idx}`} style={{ color: 'blue' }}>
              {op.insert}
            </a>
          </ListItem>
        );
      }
    });
    return toc;
  };

  return (
    <Flex>
      <Box flex="1" maxW="800px" mx="auto" p={5} pt="12vh">
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
                <a key={idx} href={op.attributes.link} style={{ color: 'teal' }} target="_blank" rel="noopener noreferrer">
                  {op.insert}
                </a>
              );
            } else if (op.insert && op.insert.image) {
              return (
                <Image
                  key={idx}
                  src={op.insert.image}
                  alt="Post content"
                  mx="auto"
                  // fallbackSrc="/path/to/loading-image.gif" 
                  loading="lazy" 
                />
              );
            }
            return null;
          })}
        </VStack>
        <CommentSection postId={id} />
        <HStack mt={4} spacing={4}>
          <Button
            onClick={() => handleNavigation(previousPostId)}
            disabled={!previousPostId}
            colorScheme="blue"
          >
            Previous
          </Button>
          <Button
            onClick={() => handleNavigation(nextPostId)}
            disabled={!nextPostId}
            colorScheme="blue"
          >
            Next
          </Button>
        </HStack>
      </Box>
      <LatestPostsPanel />
    </Flex>
  );
}
