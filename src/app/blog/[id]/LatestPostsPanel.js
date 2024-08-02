'use client';
import { useState, useEffect } from 'react';
import { getdatafromdb } from '@/lib/firebase';
import { Box, Heading, Input, Image, Button, Flex, Grid, GridItem, HStack, Text, Link } from '@chakra-ui/react';

export default function LatestPostsPanel() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsFromDb = await getdatafromdb('content/approvedposts');
      if (postsFromDb) {
        const postsArray = Object.entries(postsFromDb).sort((a, b) => b[1].timestamp - a[1].timestamp);
        setPosts(postsArray);
        setFilteredPosts(postsArray);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter(post =>
      post[1].title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
    setCurrentPostIndex(0);
  }, [searchTerm, posts]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleNextPost = () => {
    if (currentPostIndex < filteredPosts.length - 1) {
      setCurrentPostIndex(currentPostIndex + 1);
    }
  };

  const handlePreviousPost = () => {
    if (currentPostIndex > 0) {
      setCurrentPostIndex(currentPostIndex - 1);
    }
  };

  const currentPost = filteredPosts[currentPostIndex];

  return (
    <Box width="300px" p={4} mt={"12vh"} borderLeftWidth="1px" borderColor="gray.200">
      <Heading size="md" colorScheme={"teal"} mb={4}>Latest Posts</Heading>
      <Input
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search posts..."
        mb={4}
      />
      <Flex direction="column" mb={4}>
        {currentPost && (
          <Box mb={4}>
            <Image src={currentPost[1].thumbnail || '/defaultImage.jpg'} alt={currentPost[1].title} mb={2} />
            <Text fontWeight="bold">{currentPost[1].title}</Text>
            <Text fontSize="sm">{currentPost[1].excerpt}</Text>
          </Box>
        )}
        <HStack spacing={4}>
          <Button onClick={handlePreviousPost} isDisabled={currentPostIndex === 0}>Previous</Button>
          <Button onClick={handleNextPost} isDisabled={currentPostIndex === filteredPosts.length - 1}>Next</Button>
        </HStack>
      </Flex>
      <Grid templateColumns="1fr" gap={4}>
        {filteredPosts.map((post, index) => (
          <GridItem key={post[0]}>
            <Link href={`/blog/${post[0]}`} style={{ textDecoration: 'none' }}>
              <Box p={2} borderWidth="1px" borderRadius="lg" _hover={{ bg: 'gray.100' }}>
                <Image src={post[1].thumbnail || '/defaultImage.jpg'} alt={post[1].title} mb={2} />
                <Text fontWeight="bold">{post[1].title}</Text>
              </Box>
            </Link>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
