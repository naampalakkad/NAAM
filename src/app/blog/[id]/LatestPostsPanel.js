'use client';
import { useState, useEffect, useCallback } from 'react';
import { getdatafromdb } from '@/lib/firebase';
import { Box, Heading, Input, Image, Grid, GridItem, Flex,Card, HStack, Badge, Text, Link, Spinner, useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionCard = motion(Box);

export default function LatestPostsPanel() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchPosts = useCallback(async () => {
    try {
      const postsFromDb = await getdatafromdb('content/approvedposts');
      if (postsFromDb) {
        const postsArray = Object.entries(postsFromDb).sort((a, b) => b[1].timestamp - a[1].timestamp);
        setPosts(postsArray);
        setFilteredPosts(postsArray.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPosts(posts.slice(0, 5));
    } else {
      const filtered = posts.filter(post =>
        post[1].title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post[1].authorName.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 10);
      setFilteredPosts(filtered);
    }
  }, [searchTerm, posts]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Box  p={4} >
      <Heading size="lg" color={"teal"} mb={4}>Latest Posts</Heading>
      <Input
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search posts..."
        mb={4}
        variant="outline"
      />
      {loading ? (
        <Flex justifyContent="center" alignItems="center" height="100px">
          <Spinner size="lg" color="blue.500" />
        </Flex>
      ) : (
        <Grid templateColumns="1fr" gap={4}>
          {filteredPosts.length === 0 ? (
            <Text textAlign="center" color="gray.500">No posts found.</Text>
          ) : (
            filteredPosts.map((post) => (
              <GridItem key={post[0]}>
                <Link href={`/blog/${post[0]}`} style={{ textDecoration: 'none' }}>
                  <MotionCard
                    p={2}
                    borderWidth="1px"
                    borderRadius="lg"
                    transition="transform 0.3s ease"
                    boxShadow="md"
                  >
                    <Image
                      src={post[1].thumbnail || '/defaultImage.jpg'}
                      alt={post[1].title}
                      mb={2}
                      fallbackSrc="/path/to/loading-image.gif"
                      loading="lazy"
                      width={"150"}
                      height={"150"}
                      objectFit={"cover"}
                    />
                    <HStack mb={2}>
                      <Badge colorScheme="blue">{post[1]?.type}</Badge>
                      <Badge colorScheme="yellow" width={"200px"} overflow={"hidden"}>{post[1]?.authorName}</Badge>
                    </HStack>
                    <Text fontWeight="bold">{post[1].title}</Text>
                  </MotionCard>
                </Link>
              </GridItem>
            ))
          )}
        </Grid>
      )}
    </Box>
  );
}