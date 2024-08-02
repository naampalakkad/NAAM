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
  HStack,
  Skeleton,
  SkeletonText,
  Heading,
  useToast,
  IconButton
} from '@chakra-ui/react';
import { getdatafromdb, auth, getLikesCount, addLike, removeLike } from '@/lib/firebase';
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';
import PostModal from './postmodel';

const defaultImage = "./assets/logo.webp";

const BlogsPanel = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const toast = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      const postsFromDb = await getdatafromdb('content/approvedposts');
      if (postsFromDb) {
        const postsArray = Object.entries(postsFromDb);
        postsArray.sort((a, b) => b[1].timestamp - a[1].timestamp);
        setPosts(postsArray);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchLikes = async () => {
      const likesData = {};
      const likedData = {};
      for (const [id, post] of posts) {
        const likeCount = await getLikesCount(id);
        likesData[id] = likeCount;

        if (auth.currentUser) {
          const userId = auth.currentUser.uid;
          const hasLiked = await getdatafromdb(`content/approvedposts/${id}/likes/${userId}`);
          likedData[id] = !!hasLiked;
        }
      }
      setLikes(likesData);
      setLikedPosts(likedData);
    };
    if (posts.length) {
      fetchLikes();
    }
  }, [posts]);

  const openModal = (post) => {
    // setSelectedPost(post);
    // setIsOpen(true);
    const postId = post[0];
    window.location=`/blog/${postId}`;
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsOpen(false);
  };

  const handleLike = async (postId) => {
    try {
      if (!auth.currentUser) {
        toast({
          title: "You need to sign in to like posts",
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      const userId = auth.currentUser.uid;
      if (likedPosts[postId]) {
        await removeLike(postId, userId);
        setLikedPosts((prev) => ({ ...prev, [postId]: false }));
        setLikes((prev) => ({ ...prev, [postId]: prev[postId] - 1 }));
        toast({
          title: "Like removed",
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      } else {
        await addLike(postId, userId);
        setLikedPosts((prev) => ({ ...prev, [postId]: true }));
        setLikes((prev) => ({ ...prev, [postId]: prev[postId] + 1 }));
        toast({
          title: "Like added",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  const handleOpenPost = (post) => {
    openModal(post);
  };

  return (
    <>
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
        gap={4}
        width={"80vw"}
      >
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} minBlockSize={250} width={"300px"} variant="elevated" size="sm">
              <Skeleton height="150px" />
              <CardBody>
                <SkeletonText noOfLines={2} spacing={4} />
              </CardBody>
            </Card>
          ))
          : posts.map((post, index) => (
            <Card
              key={index}
              minBlockSize={250}
              width={"300px"}
              variant="elevated"
              size="sm"
            >
              <CardHeader>
                <Image
                  src={post[1]?.coverImage || defaultImage}
                  alt="Cover Image"
                  borderRadius="lg"
                  maxH="150px"
                  width={"100%"}
                  objectFit="cover"
                  cursor="pointer"
                />
              </CardHeader>
              <CardBody>
                <Stack>
                  <HStack>
                    <Badge colorScheme="blue">{post[1]?.type}</Badge>
                    <Badge colorScheme="yellow">{post[1]?.authorName}</Badge>
                  </HStack>
                  <Heading size={"md"}>{post[1]?.title}</Heading>
                  <HStack justifyContent={"space-evenly"}>
                    <Button fontWeight="bold" onClick={() => handleOpenPost(post)}>
                      Read More
                    </Button>
                    <IconButton
                      aria-label="Like button"
                      icon={likedPosts[post[0]] ? <FaThumbsUp /> : <FaRegThumbsUp />}
                      variant="link"
                      onClick={() => handleLike(post[0])}
                    />
                    <span>{likes[post[0]] || 0}</span>
                  </HStack>
                </Stack>
              </CardBody>
            </Card>
          ))}
      </Grid>
      {selectedPost && (
        <PostModal
          isOpen={isOpen}
          onClose={closeModal}
          selectedPost={selectedPost}
        />
      )}
    </>
  );
};

export default BlogsPanel;
